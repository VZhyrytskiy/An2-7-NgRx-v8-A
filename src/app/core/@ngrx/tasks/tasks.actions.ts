import { createAction, props } from '@ngrx/store';

import { Task, TaskModel } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Tasks] GET_TASKS');
export const getTasksSuccess = createAction(
  '[Tasks] GET_TASKS_SUCCEESS',
  props<{ tasks: TaskModel[] }>()
);
export const getTasksError = createAction(
  '[Tasks] GET_TASKS_ERROR',
  props<{ error: Error | string }>()
);

export const getTask = createAction(
  '[Tasks] GET_TASK',
  props<{ taskID: number }>()
);

export const getTaskSuccess = createAction(
  '[Tasks] GET_TASK_SUCCESS',
  props<{ task: Task }>()
);

export const getTaskError = createAction(
  '[Tasks] GET_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const createTask = createAction(
  '[Tasks] CREATE_TASK',
  props<{ task: Task }>()
);

export const createTaskSuccess = createAction(
  '[Tasks] CREATE_TASK_SUCCESS',
  props<{ task: Task }>()
);

export const createTaskError = createAction(
  '[Tasks] CREATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const updateTask = createAction(
  '[Tasks] UPDATE_TASK',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Tasks] UPDATE_TASK_SUCCESS',
  props<{ task: Task }>()
);

export const updateTaskError = createAction(
  '[Tasks] UPDATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const deleteTask = createAction(
  '[Tasks] DELETE_TASK',
  props<{ task: Task }>()
);

export const doneTask = createAction(
  '[Tasks] DONE_TASK',
  props<{ task: Task }>()
);
