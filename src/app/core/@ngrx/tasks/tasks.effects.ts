import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// @NgRx
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as TasksActions from './tasks.actions';

// rxjs
import { Observable } from 'rxjs';
import { concatMap, pluck, switchMap, map } from 'rxjs/operators';

import { TaskPromiseService } from './../../../tasks/services';
import { TaskModel } from '../../../tasks/models/task.model';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
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
          .catch(error => TasksActions.getTaskError({ error }))
      )
    )
  );

  updateTask$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      map(action => {
        const { type: deleted, ...task } = { ...action };
        return task;
      }),
      concatMap((task: TaskModel) =>
        this.taskPromiseService
          .updateTask(task)
          .then(updatedTask => {
            this.router.navigate(['/home']);
            return TasksActions.updateTaskSuccess(updatedTask);
          })
          .catch(error => TasksActions.updateTaskError({ error }))
      )
    )
  );
}
