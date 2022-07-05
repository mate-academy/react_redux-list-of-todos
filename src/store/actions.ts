import { Todo, Action, User } from '../react-app-env';

export const SET_TODOS = 'SET_TODOS';
export const SET_USER = 'SET_USER';

export const setTodosAction = (payload: Todo[]): Action => ({
  type: SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null): Action => ({
  type: SET_USER,
  payload,
});
