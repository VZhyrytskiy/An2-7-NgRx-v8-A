import { Component, OnInit } from '@angular/core';

// @Ngrx
import { Store, select } from '@ngrx/store';
import {
  AppState,
  selectTasksData,
  selectTasksError
} from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable } from 'rxjs';

import { TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<TaskModel>>;
  tasksError$: Observable<Error | string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(selectTasksData));
    this.tasksError$ = this.store.pipe(select(selectTasksError));
  }

  onCreateTask() {
    this.store.dispatch(
      RouterActions.go({
        path: ['/add']
      })
    );
  }

  onCompleteTask(task: TaskModel): void {
    const doneTask = { ...task, done: true };
    this.store.dispatch(TasksActions.updateTask(doneTask));
  }

  onEditTask(task: TaskModel): void {
    const link = ['/edit', task.id];
    this.store.dispatch(
      RouterActions.go({
        path: link
      })
    );
  }

  onDeleteTask(task: TaskModel) {
    this.store.dispatch(TasksActions.deleteTask(task));
  }
}
