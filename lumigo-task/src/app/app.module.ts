import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { TaskCardComponent } from './components/tasks/task-card/task-card.component';
import { ToDoListComponent } from './components/to-do-list/to-do-list.component';
import { TaskService } from './components/tasks/services/tasks.service';
import { DataService } from './services/mock-server';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { TaskStatusDirective } from './components/tasks/directives/task-status.directive';
import { DateHeaderComponent } from './components/date/date-header/date-header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ProgressBarComponent,
    TaskCardComponent,
    ToDoListComponent,
    TasksListComponent,
    TaskStatusDirective,
    DateHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragDropModule,


  ],
  exports: [
    DragDropModule,


  ],
  providers: [
    TaskService, 
    DataService, 
    DatePipe,
    TaskStatusDirective
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
