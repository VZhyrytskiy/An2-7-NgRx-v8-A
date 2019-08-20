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

export const getTask = createAction(
  '[Add/Edit Task Page (App)] GET_TASK',
  props<{ taskID: number }>()
);

export const createTask = createAction(
  '[Add/Edit Task Page] CREATE_TASK',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Add/Edit Task Page] UPDATE_TASK',
  props<{ task: Task }>()
);

export const completeTask = createAction(
  '[Task List Page] COMPLETE_TASK',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Task List Page] DELETE_TASK',
  props<{ task: Task }>()
);

export const doneTask = createAction(
  '[Tasks] DONE_TASK',
  props<{ task: Task }>()
);
