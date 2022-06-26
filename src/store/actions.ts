import { Action, Todo, User } from '../react-app-env';

export const SET_TODOS = 'SET_TODOS';
export const SET_USER = 'SET_USER';
export const REMOVE_USER = 'REMOVE_USER';

export const setTodosAction = (payload: Todo[]): Action => ({
  type: SET_TODOS,
  payload,
});

export const setUserAction = (payload: User): Action => ({
  type: SET_USER,
  payload,
});

export const removeSelectedUser = (): Action => ({
  type: REMOVE_USER,
});
