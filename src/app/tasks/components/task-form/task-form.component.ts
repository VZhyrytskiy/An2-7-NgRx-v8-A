import { Component, OnInit } from '@angular/core';

// @NgRx
import { Store, select } from '@ngrx/store';
import { AppState, selectSelectedTaskByUrl } from './../../../core/@ngrx';
import * as TasksActions from './../../../core/@ngrx/tasks/tasks.actions';
import * as RouterActions from './../../../core/@ngrx/router/router.actions';

// rxjs
import { Subscription } from 'rxjs';
import { AutoUnsubscribe } from './../../../core';

import { TaskModel } from './../../models/task.model';

@Component({
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
@AutoUnsubscribe()
export class TaskFormComponent implements OnInit {
  task: TaskModel;

  private sub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.sub = this.store
      .pipe(select(selectSelectedTaskByUrl))
      .subscribe(task => (this.task = { ...task }));
  }

  onSaveTask() {
    const task = { ...this.task };

    if (task.id) {
      this.store.dispatch(TasksActions.updateTask(task));
    } else {
      this.store.dispatch(TasksActions.createTask(task));
    }
  }

  onGoBack(): void {
    this.store.dispatch(
      RouterActions.go({
        path: ['/home']
      })
    );
  }
}
