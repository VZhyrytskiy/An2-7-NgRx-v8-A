import { Action, createReducer, on } from '@ngrx/store';

import { adapter, TasksState, initialTasksState } from './tasks.state';
import * as TasksActions from './tasks.actions';

const reducer = createReducer(
  initialTasksState,
  on(TasksActions.getTasks, state => {
    console.log('GET_TASKS action being handled!');
    return {
      ...state,
      loading: true
    };
  }),
  on(TasksActions.getTasksSuccess, (state, { tasks }) => {
    console.log('GET_TASKS_SUCCESS action being handled!');
    return adapter.addAll(tasks, {
      ...state,
      loading: false,
      loaded: true,
      selectedTask: null
    });
    // const data = [...props.tasks];
    // return {
    //   ...state,
    //   data,
    //   loading: false,
    //   loaded: true,
    //   selectedTask: null
    // };
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

  on(TasksActions.createTaskSuccess, (state, { task }) => {
    console.log('CREATE_TASK_SUCCESS action being handled!');
    return adapter.addOne(task, state);
    // const task = { ...props.task };
    // const data = [...state.data, task];

    // return {
    //   ...state,
    //   data
    // };
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

  on(TasksActions.updateTaskSuccess, (state, { task }) => {
    console.log('UPDATE_TASK_SUCCESS action being handled!');
    return adapter.updateOne({ id: task.id, changes: task }, state);
    // const data = [...state.data];
    // const task = props.task;

    // const index = data.findIndex(t => t.id === task.id);

    // data[index] = { ...task };

    // return {
    //   ...state,
    //   data
    // };
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

  on(TasksActions.deleteTaskSuccess, (state, { task }) => {
    console.log('DELETE_TASK_SUCCESS action being handled!');
    return adapter.removeOne(task.id, state);
    // const data = state.data.filter(t => t.id !== props.task.id);

    // return {
    //   ...state,
    //   data
    // };
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
