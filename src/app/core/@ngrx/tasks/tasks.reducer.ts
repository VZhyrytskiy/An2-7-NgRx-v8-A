import { Action, createReducer, on } from '@ngrx/store';

import { TasksState, initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';
import { TaskModel } from 'src/app/tasks/models/task.model';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    console.log('GET_TASKS action being handled!');
    return {
      ...state,
      loading: true
    };
  }),
  on(TasksActions.getTasksSuccess, (state, props) => {
    console.log('GET_TASKS_SUCCESS action being handled!');
    const data = [...props.tasks];
    return {
      ...state,
      data,
      loading: false,
      loaded: true,
      selectedTask: null
    };
  }),
  on(TasksActions.getTasksError, (state, props) => {
    console.log('GET_TASKS_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),
  
  on(TasksActions.createTask, state => {
    console.log('CREATE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.createTaskSuccess, (state, task) => {
    console.log('CREATE_TASK_SUCCESS action being handled!');
    const { type: deleted, ...taskToCreate } = { ...task };
    const data = [...state.data, taskToCreate];

    return {
      ...state,
      data
    };
  }),

  on(TasksActions.createTaskError, (state, props) => {
    console.log('CREATE_TASK_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),

  on(TasksActions.updateTask, state => {
    console.log('UPDATE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.updateTaskSuccess, (state, task) => {
    console.log('UPDATE_TASK_SUCCESS action being handled!');
    const data = [...state.data];
    const index = data.findIndex(t => t.id === task.id);

    const { type: deleted, ...taskToUpdate } = { ...task };
    data[index] = taskToUpdate;

    return {
      ...state,
      data
    };
  }),

  on(TasksActions.updateTaskError, (state, props) => {
    console.log('UPDATE_TASK_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  }),

  on(TasksActions.deleteTask, state => {
    console.log('DELETE_TASK action being handled!');
    return { ...state };
  }),

  on(TasksActions.deleteTaskSuccess, (state, task) => {
    console.log('DELETE_TASK_SUCCESS action being handled!');
    const data = state.data.filter(t => t.id !== task.id);

    return {
      ...state,
      data
    };
  }),

  on(TasksActions.deleteTaskError, (state, props) => {
    console.log('DELETE_TASK_ERROR action being handled!');
    const error = props.error;
    return {
      ...state,
      error
    };
  })
);

export function tasksReducer(state: TasksState | undefined, action: Action) {
  return reducer(state, action);
}
