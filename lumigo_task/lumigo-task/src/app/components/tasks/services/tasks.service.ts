import { HttpStatusCode } from "@angular/common/http";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Task, TaskStatus } from "src/app/models/task.model";
import { DataService } from "src/app/services/mock-server";

@Injectable({
    providedIn: 'root'
})
export class TaskService {    
    
    private searchTasks$ = new Subject<string>();
    private updateTasks$ = new BehaviorSubject<boolean>(true);

    updateTasksMessage = this.updateTasks$.asObservable();
    searchTasksMessage = this.searchTasks$.asObservable();
    
    constructor(private dataService: DataService) {}

    public loadTasks(): Observable<Task[]> {
        return this.dataService.loadDataFromLocalStorage(); 
    }

    public updateTaskStatus(taskId: string, status: TaskStatus): void {
        this.dataService.updateTaskStatus(taskId, status)
            .subscribe((status: HttpStatusCode) => {
                if (status == HttpStatusCode.Ok) {
                    this.updateTasks$.next(true);
                }
                else {
                    // NEED TO IMPLEMENT
                }
            },
            catchError => {
                 // NEED TO IMPLEMENT
            });        
    }

    public updateTaskTitle(taskId: string, title: string): void {
        this.dataService.updateTaskTitle(taskId, title)
        .subscribe((status: HttpStatusCode) => {
            if (status == HttpStatusCode.Ok) {
                this.updateTasks$.next(true);
            }
            else {
                // NEED TO IMPLEMENT
            }
        },
        catchError => {
             // NEED TO IMPLEMENT
        }); 
    }

    public createNewTask(task: Task): void {
        this.dataService.createNewTask(task);      
        this.updateTasks$.next(true);
    }

    public onTaskSearch(val: string) {
        this.searchTasks$.next(val);
    }

    public deleteTask(taskId: string): void {
        this.dataService.deleteTask(taskId)
            .subscribe((status: HttpStatusCode) => {

                if (status == HttpStatusCode.Ok) {
                    this.updateTasks$.next(true);
                }
                else {
                    // NEED TO IMPLEMENT
                }
            },
            catchError => {
                // NEED TO IMPLEMENT
            });            
    }

}