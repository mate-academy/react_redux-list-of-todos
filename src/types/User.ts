import { Maybe } from './Maybe';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export enum UserActionTypes {
  user_FETCH_START = 'user_FETCH_START',
  user_FETCH_SUCCESS = 'user_FETCH_SUCCESS',
  user_FETCH_ERROR = 'user_FETCH_ERROR',
  user_FETCH_FINISH = 'user_FETCH_FINISH',
  user_UNSELECT = 'user_UNSELECT',
}

export interface UserFetchStart {
  type: UserActionTypes.user_FETCH_START,
}

export interface UserFetchSuccess {
  type: UserActionTypes.user_FETCH_SUCCESS,
  payload: User,
}

export interface UserFetchError {
  type: UserActionTypes.user_FETCH_ERROR,
  payload: string,
}

export interface UserFetchFinish {
  type: UserActionTypes.user_FETCH_FINISH,
}

export interface UserUnselect {
  type: UserActionTypes.user_UNSELECT,
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
