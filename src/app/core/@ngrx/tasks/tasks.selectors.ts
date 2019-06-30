import { createFeatureSelector } from '@ngrx/store';

import { TasksState } from './tasks.state';

export const selectTasksState = createFeatureSelector<TasksState>('tasks');
