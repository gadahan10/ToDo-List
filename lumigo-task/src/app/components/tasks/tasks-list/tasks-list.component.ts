import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { showHideList } from 'src/app/shared/animations/animations';
import { TaskService } from '../services/tasks.service';

@Component({
	selector: 'tasks-list',
	templateUrl: './tasks-list.component.html',
	styleUrls: ['./tasks-list.component.scss'],
	animations: [
		showHideList
	]
})
export class TasksListComponent implements OnInit {

	isSearchActive: boolean;
	isCollapsed: boolean;
	tasksSubscription: Subscription;
	tasksBackUp: Task[] = [];

	@Input() listIdentifier: string;
	@Input() listTitle: string;
	@Input() tasks: Task[] = [];

	constructor(private _taskService: TaskService) { }

	ngOnInit(): void {
		this.tasksBackUp = [...this.tasks];

		// 1. Subscribe to search event
		this._taskService.searchTasksMessage
			.pipe(
				map(val => val.toLowerCase())
			).subscribe(val => {
				// Used to disable drag and drop on search
				this.isSearchActive = (val.length > 0) ? true : false;				
				this.tasks = [...this.tasksBackUp];
				this.tasks = this.tasks.filter(task => task.title.includes(val));
			}				
		);
	}

	public trackById(index: number, task: Task) {
		return index;
	}

	public onDrop(event: any) {
		const targetListIndex = this.getListIndex(event.container.element.nativeElement.id);

		if (!isNaN(targetListIndex)) {
			// Drag and drop reorder
			if (event.previousContainer === event.container) {
				moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
			} 
			else {
				transferArrayItem(event.previousContainer.data,
					event.container.data,
					event.previousIndex,
					event.currentIndex);
					this._taskService.updateTaskStatus(event.container.data[event.currentIndex].taskId, targetListIndex + 1);
			}
		}
	}

	private getListIndex(listId: string): number {
		const index = listId.replace('cdk-drop-list-', '');
		return parseInt(index);
	}
}
