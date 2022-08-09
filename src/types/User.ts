export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  SET_USER_NULL = 'SET_USER_NULL',
}

export interface UserState {
  user: User | null,
  loading: boolean,
  error: null | string,
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER,

}
interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS,
  payload: User,

}
interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR,
  payload: string,
}

interface SetUserNull {
  type: UserActionTypes.SET_USER_NULL,
  payload: null,

}

export type UserAction =
  FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | SetUserNull;
