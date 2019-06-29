import { createAction, props } from '@ngrx/store';

import { TaskModel } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Tasks] GET_TASKS');
export const getTasksSuccess = createAction(
  '[Tasks] GET_TASKS_SUCCEESS',
  props<TaskModel[]>()
);
export const getTasksError = createAction(
  '[Tasks] GET_TASKS_ERROR',
  props<{ error: Error | string }>()
);

export const getTask = createAction(
  '[Tasks] GET_TASK',
  props<{ taskID: number }>()
);

export const createTask = createAction(
  '[Tasks] CREATE_TASK',
  props<TaskModel>()
);

export const updateTask = createAction(
  '[Tasks] UPDATE_TASK',
  props<TaskModel>()
);

export const deleteTask = createAction(
  '[Tasks] DELETE_TASK',
  props<TaskModel>()
);

export const doneTask = createAction('[Tasks] DONE_TASK', props<TaskModel>());
