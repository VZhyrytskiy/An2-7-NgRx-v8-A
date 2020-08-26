import { Component, OnInit } from '@angular/core';

// @Ngrx
import { Store, select } from '@ngrx/store';
import { selectTasksData, selectTasksError, selectTasksDataPartial } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Observable } from 'rxjs';

import { Task, TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<ReadonlyArray<Task>>;
  tasksError$: Observable<Error | string>;

  constructor(private store: Store) {}

  ngOnInit() {
    this.tasks$ = this.store.pipe(select(selectTasksData));
    // this.tasks$ = this.store.pipe(select(selectTasksDataPartial, { count: 2}));
    this.tasksError$ = this.store.pipe(select(selectTasksError));

    this.store.dispatch(TasksActions.getTasks());
  }

  onCreateTask() {
    this.store.dispatch(
      RouterActions.go({
        path: ['/add']
      })
    );
  }

  onCompleteTask(task: TaskModel): void {
    // task is not plain object
    // taskToComplete is a plain object
    const taskToComplete: Task = { ...task, done: true };
    this.store.dispatch(TasksActions.completeTask({ task: taskToComplete }));
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
    const taskToDelete: Task = { ...task };
    this.store.dispatch(TasksActions.deleteTask({ task: taskToDelete }));
  }
}
