export enum UserActionTypes {
  FETCH_USER = 'FETCH_USER',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  RESET_USER = 'RESET_USER',
}

interface FetchUserAction {
  type: UserActionTypes.FETCH_USER;
}

interface FetchUserSuccessAction {
  type: UserActionTypes.FETCH_USER_SUCCESS;
  payload: User;
}

interface FetchUserErrorAction {
  type: UserActionTypes.FETCH_USER_ERROR;
  payload: string;
}

interface ResetUserAction {
  type: UserActionTypes.RESET_USER;
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: null | string;
}

export type UserAction =
  FetchUserAction
  | FetchUserSuccessAction
  | FetchUserErrorAction
  | ResetUserAction;
