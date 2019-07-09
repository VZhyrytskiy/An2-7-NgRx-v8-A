import { Action, createReducer, on } from '@ngrx/store';

import { UsersState, initialUsersState } from './users.state';
import * as UsersActions from './users.actions';
import { User } from './../../../users/models/user.model';

const reducer = createReducer(
  initialUsersState,
  on(UsersActions.getUsers, state => {
    return {
      ...state,
      loading: true
    };
  }),

  on(UsersActions.getUsersSuccess, (state, props) => {
    const users = [...props.users];

    const entities = users.reduce(
      (result: { [id: number]: User }, user: User) => {
        return {
          ...result,
          [user.id]: user
        };
      },
      {
        ...state.entities
      }
    );

    return {
      ...state,
      loading: false,
      loaded: true,
      entities
    };
  }),

  on(UsersActions.getUsersError, (state, props) => {
    const error = props.error;

    return {
      ...state,
      loading: false,
      loaded: false,
      error
    };
  }),

  on(UsersActions.createUserSuccess, (state, props) => {
    const createdUser = { ...props.user };
    const entities = {
      ...state.entities,
      [createdUser.id]: createdUser
    };
    const originalUser = { ...createdUser };

    return {
      ...state,
      entities,
      originalUser
    };
  }),

  on(UsersActions.createUserError, (state, props) => {
    const error = props.error;

    return {
      ...state,
      error
    };
  }),

  on(UsersActions.updateUserSuccess, (state, props) => {
    const updatedUser = { ...props.user };
    const entities = {
      ...state.entities,
      [updatedUser.id]: updatedUser
    };
    const originalUser = { ...updatedUser };

    return {
      ...state,
      entities,
      originalUser
    };
  }),

  on(UsersActions.updateUserError, (state, props) => {
    const error = props.error;

    return {
      ...state,
      error
    };
  }),

  on(UsersActions.deleteUserSuccess, (state, props) => {
    const { [props.user.id]: removed, ...entities } = state.entities;

    return {
      ...state,
      entities
    };
  }),

  on(UsersActions.deleteUserError, (state, props) => {
    const error = props.error;

    return {
      ...state,
      error
    };
  }),

  on(UsersActions.setOriginalUser, (state, props) => {
    const originalUser = { ...props.user };

    return {
      ...state,
      originalUser
    };
  })
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
