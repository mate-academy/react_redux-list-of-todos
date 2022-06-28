import { Action, Todo, User } from '../react-app-env';

export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

export const setTodosAction = (payload: Todo[]): Action => ({
  type: SET_TODOS,
  payload,
});

export const addTodoAction = (payload: Todo): Action => ({
  type: ADD_TODO,
  payload,
});

export const setUserAction = (payload: User): Action => ({
  type: SET_USER,
  payload,
});

export const removeUserAction = () => ({
  type: CLEAR_USER,
});
