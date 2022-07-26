import { AfterViewChecked, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Task, TaskStatus } from 'src/app/models/task.model';
import { TaskService } from '../services/tasks.service';

@Component({
	selector: 'task-card',
	templateUrl: './task-card.component.html',
	styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit, AfterViewChecked {
	
	isMenuOpened: boolean;
	titleBackup: string;
	
	@Input() isSearchActive: boolean;
	@Input() taskData: Task;
	@ViewChild('editTitleEl') editTitleInput: ElementRef;

	constructor(private _taskService: TaskService) { }

	ngAfterViewChecked(): void {
		if (this.editTitleInput) {			
			this.editTitleInput.nativeElement.focus();
		}
	}

	ngOnInit(): void {
		this.titleBackup = this.taskData.title;		
	}

	public onEditTitle(): void {
		this.taskData.isEditMode = true;
	}	

	public discardChanges(): void {
		this.titleBackup = this.taskData.title;
		this.taskData.isEditMode = false;
	}

	public saveChanges(): void {
		this.taskData.title = this.titleBackup;
		this.taskData.isEditMode = false;
		this._taskService.updateTaskTitle(this.taskData.taskId, this.taskData.title)
	}

	public onEditClick(): void {
		this.taskData.isEditMode = true; 
		this.isMenuOpened = false;
	}

	public onChangeStatus(status: TaskStatus): void {
		if (this.taskData.status != status) {						
			this._taskService.updateTaskStatus(this.taskData.taskId, status);
		}		
	}

	public onDeleteCard(): void {
		this._taskService.deleteTask(this.taskData.taskId);
	}
}
