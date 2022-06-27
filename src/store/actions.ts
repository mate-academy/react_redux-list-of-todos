import { AnyAction } from 'redux';
import { Todo, User } from '../react-app-env';

export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const SET_USER = 'SET_USER';

export const setTodosAction = (payload: Todo[]): AnyAction => ({
  type: SET_TODOS,
  payload,
});

export const addTodoAction = (payload: Todo): AnyAction => ({
  type: ADD_TODO,
  payload,
});

export const setUserAction = (payload: User): AnyAction => ({
  type: SET_USER,
  payload,
});
