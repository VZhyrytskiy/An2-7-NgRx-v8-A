import { createFeatureSelector } from '@ngrx/store';

import { AppState } from './../app.state';
import { TasksState } from './tasks.state';

export const selectTasksState = createFeatureSelector<AppState, TasksState>('tasks');
