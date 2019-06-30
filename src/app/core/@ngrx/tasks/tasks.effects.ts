import { Injectable } from '@angular/core';

// @NgRx
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';

// rxjs
import { Observable } from 'rxjs';
import { pluck, switchMap } from 'rxjs/operators';

import { TaskPromiseService } from './../../../tasks/services';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private taskPromiseService: TaskPromiseService
  ) {
    console.log('[TASKS EFFECTS]');
  }

  getTasks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTasks),
      switchMap(action =>
        this.taskPromiseService
          .getTasks()
          .then(tasks => TasksActions.getTasksSuccess({ tasks }))
          .catch(error => TasksActions.getTasksError({ error }))
      )
    )
  );

  getTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.getTask),
      pluck('taskID'),
      switchMap(taskID =>
        this.taskPromiseService
          .getTask(taskID)
          .then(task => TasksActions.getTaskSuccess(task))
          .catch(error => TasksActions.getTasksError({ error }))
      )
    )
  );
}