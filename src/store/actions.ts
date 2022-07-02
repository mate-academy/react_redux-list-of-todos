import { Action, Todo, User } from '../react-app-env';

export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const SET_USER = 'SET_USER';
export const DELETE_TODO = 'DELETE_TODO';

export const setTodosAction = (payLoad: Todo[]): Action => ({
  type: SET_TODOS,
  payLoad,
});

export const addTodosAction = (payLoad: Todo): Action => ({
  type: ADD_TODO,
  payLoad,
});

export const setUserAction = (payLoad: User | null): Action => ({
  type: SET_USER,
  payLoad,
});

export const deleteTodoAction = (payLoad: number): Action => ({
  type: DELETE_TODO,
  payLoad,
});
