import { createAction, props } from '@ngrx/store';

import { Task } from './../../../tasks/models/task.model';

export const getTasks = createAction('[Tasks] GET_TASKS');

export const getTask = createAction(
  '[Tasks] GET_TASK',
  props<{ taskID: number }>()
);

export const createTask = createAction(
  '[Tasks] CREATE_TASK',
  props<{ task: Task }>()
);

export const updateTask = createAction(
  '[Tasks] UPDATE_TASK',
  props<{ task: Task }>()
);

export const deleteTask = createAction(
  '[Tasks] DELETE_TASK',
  props<{ task: Task }>()
);

export const doneTask = createAction('[Tasks] DONE_TASK', props<TaskModel>());
