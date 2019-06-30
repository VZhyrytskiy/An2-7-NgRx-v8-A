import { createFeatureSelector } from '@ngrx/store';

import { TasksState } from './tasks.state';

export const getTasksState = createFeatureSelector<TasksState>('tasks');
