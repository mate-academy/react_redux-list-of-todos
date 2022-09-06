import { Maybe } from './Maybe';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export enum UserActionTypes {
  UserFetchStart = 'user/FETCH_START',
  UserFetchSuccess = 'user/FETCH_SUCCESS',
  UserFetchError = 'user/FETCH_ERROR',
  UserFetchFinish = 'user/FETCH_FINISH',
  UserUnselect = 'user/UNSELECT',
}

export interface UserFetchStart {
  type: UserActionTypes.UserFetchStart,
}

export interface UserFetchSuccess {
  type: UserActionTypes.UserFetchSuccess,
  payload: User,
}

export interface UserFetchError {
  type: UserActionTypes.UserFetchError,
  payload: string,
}

export interface UserFetchFinish {
  type: UserActionTypes.UserFetchFinish,
}

export interface UserUnselect {
  type: UserActionTypes.UserUnselect,
}

export type UserAction = (
  UserFetchStart | UserFetchSuccess | UserFetchError
  | UserFetchFinish | UserUnselect
);

export interface UserState {
  user: Maybe<User>,
  loading: boolean,
  error: Maybe<string>,
}
