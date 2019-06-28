import { Action, createReducer, on } from '@ngrx/store';

import { TasksState, initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';
import { TaskModel } from 'src/app/tasks/models/task.model';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    console.log('GET_TASKS action being handled!');
    return { ...state };
  }),
  on(TasksActions.getTask, state => {
    console.log('GET_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.createTask, state => {
    console.log('CREATE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.updateTask, state => {
    console.log('UPDATE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),
  on(TasksActions.doneTask, (state, task) => {
    console.log('DONE_TASK action being handled!');

    const id = (task as TaskModel).id;
    const data = state.data.map(task => {
      if (task.id === id) {
        return { ...task, done: true };
      }

      return task;
    });

    return {
      ...state,
      data
    };
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
