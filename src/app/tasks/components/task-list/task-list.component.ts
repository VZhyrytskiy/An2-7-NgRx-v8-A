import { Component, OnInit } from '@angular/core';

// rxjs
import { Observable } from 'rxjs';

// @ngrx
import { TasksFacade } from './../../../core/@ngrx';

import { Task, TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;

  constructor(private tasksFacade: TasksFacade) {}

  ngOnInit() {
    this.tasks$ = this.tasksFacade.tasks$;
    this.tasksError$ = this.tasksFacade.tasksError$;
  }

  onCreateTask() {
    this.tasksFacade.goTo({ path: ['/add'] });
  }

  onCompleteTask(task: TaskModel): void {
    // task is not plain object
    // taskToComplete is a plain object
    const taskToComplete: Task = { ...task, done: true };
    this.tasksFacade.updateTask({ task: taskToComplete });
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.tasksFacade.goTo({ path: link });
  }

  onDeleteTask(task: TaskModel) {
    const taskToDelete: Task = { ...task };
    this.tasksFacade.deleteTask({ task: taskToDelete });
  }
}
