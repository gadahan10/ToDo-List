import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Task, TaskStatus } from "../models/task.model";
import { HttpStatusCode } from '@angular/common/http';

// This is service is as a mock data\server
@Injectable({
    providedIn: 'root'
})
export class DataService {

	data: Task[] = [];
    

    constructor() {		
		const data = localStorage.getItem('tasks');
		this.data = (data != null) ? JSON.parse(data) : [];
	}

    public loadDataFromLocalStorage(): Observable<Task[]> {
		const data = localStorage.getItem('tasks');
		
		if (data != null) {			
			return of(JSON.parse(data));
		}
		
        return of (this.data);       
    }

	public createNewTask(task: Task) {
		this.data.push(task);
		localStorage.setItem('tasks', JSON.stringify(this.data));
	}

	public updateTaskStatus(taskId: string, status: TaskStatus): Observable<HttpStatusCode> {
        const index = this.data.map(task => task.taskId).indexOf(taskId);
      
        if (index >= 0) {       
            this.data[index].status = status;    
			localStorage.setItem('tasks', JSON.stringify(this.data));
			return of(HttpStatusCode.Ok)        
        }
		
		return of(HttpStatusCode.NotModified);
    }

	public updateTaskTitle(taskId: string, title: string): Observable<HttpStatusCode> {
        const index = this.data.map(task => task.taskId).indexOf(taskId);
		console.log(taskId)
        if (index >= 0) {       
            this.data[index].title = title;    
			localStorage.setItem('tasks', JSON.stringify(this.data));
			return of(HttpStatusCode.Ok)        
        }
		
		return of(HttpStatusCode.NotModified);
    }

	public deleteTask(taskId: string): Observable<HttpStatusCode> {		
		const index = this.data.map(task => task.taskId).indexOf(taskId);
		
		if (index >= 0) {
			this.data.splice(index, 1);
			localStorage.setItem('tasks', JSON.stringify(this.data));
			return of(HttpStatusCode.Ok);
		}

		return of(HttpStatusCode.NotModified);
	}

	public deleteAllTasks(): Observable<HttpStatusCode> {	
		this.data = [];
		localStorage.setItem('tasks', JSON.stringify(this.data));
		return of(HttpStatusCode.Ok);
	}
}