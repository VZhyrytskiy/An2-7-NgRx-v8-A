import { createAction, props } from '@ngrx/store';

import { Task } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Task List Page (App)] GET_TASKS');

export const getTasksSuccess = createAction(
  '[Tasks API] GET_TASKS_SUCCEESS',
  props<{ tasks: Task[] }>()
);
export const getTasksError = createAction(
  '[Tasks API] GET_TASKS_ERROR',
  props<{ error: Error | string }>()
);

export const createTask = createAction(
  '[Add/Edit Task Page] CREATE_TASK',
  props<{ task: Task }>()
);

export const createTaskSuccess = createAction(
  '[Tasks API] CREATE_TASK_SUCCESS',
  props<{ task: Task }>()
);

export const createTaskError = createAction(
  '[Tasks API] CREATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const updateTask = createAction(
  '[Add/Edit Task Page] UPDATE_TASK',
  props<{ task: Task }>()
);

export const completeTask = createAction(
  '[Task List Page] COMPLETE_TASK',
  props<{ task: Task }>()
);

export const updateTaskSuccess = createAction(
  '[Tasks API] UPDATE_TASK_SUCCESS',
  props<{ task: Task }>()
);

export const updateTaskError = createAction(
  '[Tasks API] UPDATE_TASK_ERROR',
  props<{ error: Error | string }>()
);

export const deleteTask = createAction(
  '[Task List Page] DELETE_TASK',
  props<{ task: Task }>()
);

export const deleteTaskSuccess = createAction(
  '[Tasks API] DELETE_TASK_SUCCESS',
  props<{ task: Task }>()
);

export const deleteTaskError = createAction(
  '[Tasks API] DELETE_TASK_ERROR',
  props<{ error: Error | string }>()
);
