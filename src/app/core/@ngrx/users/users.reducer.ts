import { Action, createReducer, on } from '@ngrx/store';

import { UsersState, initialUsersState } from './users.state';
import * as UsersActions from './users.actions';
import { UserModel } from './../../../users/models/user.model';

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
      (result: { [id: number]: UserModel }, user: UserModel) => {
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

  on(UsersActions.createUserSuccess, (state, user) => {
    const { type: deleted, ...createdUser } = { ...user };
    const entities = {
      ...state.entities,
      [user.id]: createdUser
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

  on(UsersActions.updateUserSuccess, (state, user) => {
    const { type: deleted, ...updatedUser } = { ...user };
    const entities = {
      ...state.entities,
      [user.id]: updatedUser
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

  on(UsersActions.deleteUserSuccess, (state, user) => {
    const { [user.id]: removed, ...entities } = state.entities;

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

  on(UsersActions.setOriginalUser, (state, user) => {
    const { type: deleted, ...originalUser } = { ...user };

    return {
      ...state,
      originalUser
    };
  })
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return reducer(state, action);
}
