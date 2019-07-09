import { createAction, props } from '@ngrx/store';

import { UserModel, User } from './../../../users/models/user.model';

export const getUsers = createAction('[Users] GET_USERS');
export const getUsersSuccess = createAction(
  '[Users] GET_USERS_SUCCEESS',
  props<{ users: UserModel[] }>()
);
export const getUsersError = createAction(
  '[Users] GET_USERS_ERROR',
  props<{ error: Error | string }>()
);

export const createUser = createAction(
  '[Users] CREATE_USER',
  props<{ user: User }>()
);

export const createUserSuccess = createAction(
  '[Users] CREATE_USER_SUCCESS',
  props<{ user: User }>()
);

export const createUserError = createAction(
  '[Users] CREATE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const updateUser = createAction(
  '[Users] UPDATE_USER',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[Users] UPDATE_USER_SUCCESS',
  props<{ user: User }>()
);

export const updateUserError = createAction(
  '[Users] UPDATE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const deleteUser = createAction(
  '[Users] DELETE_USER',
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction(
  '[Users] DELETE_USER_SUCCESS',
  props<{ user: User }>()
);

export const deleteUserError = createAction(
  '[Users] DELETE_USER_ERROR',
  props<{ error: Error | string }>()
);

export const setOriginalUser = createAction(
  '[Users] SET_ORIGINAL_USER',
  props<{ user: User }>()
);
