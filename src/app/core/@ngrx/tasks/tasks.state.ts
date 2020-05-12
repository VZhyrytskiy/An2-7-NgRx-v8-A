import { createEntityAdapter, EntityState, EntityAdapter } from '@ngrx/entity';

import { Task } from './../../../tasks/models/task.model';

export interface TasksState extends EntityState<Task> {
  readonly loading: boolean;
  readonly loaded: boolean;
  readonly error: Error | string;
}

function selectTaskId(task: Task): number {
  // In this case this would be optional since primary key is id
  return task.id;
}

function sortTasksByAction(task1: Task, task2: Task): number {
  return task1.action.localeCompare(task2.action);
}

export const adapter: EntityAdapter<Task> = createEntityAdapter<Task>({
  selectId: selectTaskId,
  sortComparer: sortTasksByAction
});

export const initialTasksState: TasksState = adapter.getInitialState({
  loading: false,
  loaded: false,
  error: null
});
