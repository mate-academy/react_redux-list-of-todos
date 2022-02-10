export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  CLEAR_USER = 'CLEAR_USER',
}

export interface FetchUserAction {
  type: UserActionTypes.FETCH_USER
}

export interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: User;
}

export interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR
  payload: string;
}
export interface ClearUserAction {
  type: UserActionTypes.CLEAR_USER
}

export type UserAction =
  FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | ClearUserAction;
