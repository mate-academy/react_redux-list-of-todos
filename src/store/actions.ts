import { Todo, User } from '../react-app-env';

export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export const ADD_USER_ID = 'ADD_USER_ID';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User) => ({
  type: LOAD_USER,
  payload,
});

export const loadHasErrorAction = (payload: boolean) => ({
  type: LOAD_USER_ERROR,
  payload,
});

export const selectUserId = (payload: number) => ({
  type: ADD_USER_ID,
  payload,
});
