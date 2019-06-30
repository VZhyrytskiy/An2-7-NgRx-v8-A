import { createAction, props } from '@ngrx/store';

import { TaskModel } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Tasks] GET_TASKS');
export const getTasksSuccess = createAction(
  '[Tasks] GET_TASKS_SUCCEESS',
  props<{ tasks: TaskModel[] }>()
);
export const getTasksError = createAction(
  '[Tasks] GET_TASKS_ERROR',
  props<{ error: Error | string }>()
);


export const createTask = createAction(
  '[Tasks] CREATE_TASK',
  props<TaskModel>()
);

export const createTaskSuccess = createAction(
  '[Tasks] CREATE_TASK_SUCCESS',
  props<TaskModel>()
);

export const createTaskError = createAction(
  '[Tasks] CREATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const updateTask = createAction(
  '[Tasks] UPDATE_TASK',
  props<TaskModel>()
);

export const updateTaskSuccess = createAction(
  '[Tasks] UPDATE_TASK_SUCCESS',
  props<TaskModel>()
);

export const updateTaskError = createAction(
  '[Tasks] UPDATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const deleteTask = createAction(
  '[Tasks] DELETE_TASK',
  props<TaskModel>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks] DELETE_TASK_SUCCESS',
  props<TaskModel>()
);

export const deleteTaskError = createAction(
  '[Tasks] DELETE_TASK_ERROR',
  props<{ error: Error | string }>()
);
