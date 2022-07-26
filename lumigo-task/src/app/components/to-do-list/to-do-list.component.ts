import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { debounceTime, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Task } from 'src/app/models/task.model';
import { RegexPattern } from 'src/app/shared/regex-patterns';
import { TaskService } from '../tasks/services/tasks.service';

@Component({
	selector: 'to-do-list',
	templateUrl: './to-do-list.component.html',
	styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, AfterViewInit {

	// Task lists
	tasks$: Observable<Task[]>;
	inProgressTasks$: Observable<Task[]>;
	pendingTasks$: Observable<Task[]>;
	completedTasks$: Observable<Task[]>;

	// New Task
	newTaskForm = new FormGroup({
		title: new FormControl('', [Validators.required, Validators.pattern(RegexPattern.TEXT), Validators.min(4), Validators.max(40)])
	});

	// Search
	searchVal: string;
	@ViewChild('searchInput') searchInput: ElementRef;

	// Extra
	totalInProgress:number = 0;
	totalPending: number = 0;
	totalCompleted: number = 0;

	constructor(private _taskService: TaskService, private cdRef: ChangeDetectorRef) { }

	ngAfterViewInit(): void {
		this.cdRef.detectChanges();
	}

	// ngAfterViewInit(): void {
	// 	fromEvent<any>(this.searchInput.nativeElement, 'keyup')
	// 		.pipe(
	// 			debounceTime(400),
	// 			tap(() => console.log("fsafsa")),
	// 			map(event => this._taskService.onTaskSearch(event.target.value))
	// 		);
	// }

	ngOnInit(): void {		

		const tasks$ = this._taskService.updateTasksMessage
			.pipe(
				switchMap(() => this._taskService.loadTasks()),				
				shareReplay()		
			);
			
		this.inProgressTasks$ = tasks$
			.pipe(				
				map(tasks => tasks.filter(task => task.status == 1)),
				tap((total) => this.totalInProgress = total.length)
			);

		this.pendingTasks$ = tasks$
			.pipe(
				map(tasks => tasks.filter(task => task.status == 2)),
				tap((total) => this.totalPending = total.length)
			);

		this.completedTasks$ = tasks$
			.pipe(
				map(tasks => tasks.filter(task => task.status == 3)),
				tap((total) => this.totalCompleted = total.length)
			);
	}

	submitNewTask(): void {
		if (this.newTaskForm.valid) {
			const newTask = new Task(this.newTaskForm.value.title);
			this._taskService.createNewTask(newTask);
			this.newTaskForm.reset();
		}
	}

	orderTasksLists(): void {
	
		this.inProgressTasks$ = this.tasks$
			.pipe(				
				map(tasks => tasks.filter(task => task.status == 1))
			);

		this.pendingTasks$ = this.tasks$
			.pipe(
				map(tasks => tasks.filter(task => task.status == 2))
			);

		this.completedTasks$ = this.tasks$
			.pipe(
				map(tasks => tasks.filter(task => task.status == 3))
			);
	}

	onTaskSearch(): void {
		this._taskService.onTaskSearch(this.searchVal);
	}
}
