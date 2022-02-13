export interface UserState {
  user: User | null;
  isLoading: boolean;
  hasError: null | string;
  userId: number;
}

export enum UserActionTypes {
  LOAD_USER = 'LOAD_USER',
  LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS',
  LOAD_USER_ERROR = 'LOAD_USER_ERROR',
  SET_USER_ID = 'SET_USER_ID',
}

export interface LoadUserAction {
  type: UserActionTypes.LOAD_USER,
}

export interface LoadUserSuccessAction {
  type: UserActionTypes.LOAD_USER_SUCCESS,
  payload: User,
}

export interface LoadUserErrorAction {
  type: UserActionTypes.LOAD_USER_ERROR,
  payload: string,
}

export interface SetUserIdAction {
  type: UserActionTypes.SET_USER_ID,
  payload: number,
}

export type UserAction =
  LoadUserAction
  | LoadUserSuccessAction
  | LoadUserErrorAction
  | SetUserIdAction;
