import { Action, Todo, User } from '../react-app-env';

// Action types - is just a constant. MUST have a unique value.
export const START_LOADING = 'START_LOADING';
export const FINISH_LOADING = 'FINISH_LOADING';
export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODOS';
export const SET_USER = 'SET_USER';

// Action creators - a function returning an action object
export const startLoading = () => ({ type: START_LOADING });
export const finishLoading = (payload = 'No message') => ({
  type: FINISH_LOADING,
  payload,
});

export const setTodosAction = (payload: Todo[]): Action => ({
  type: SET_TODOS,
  payload,
});

export const addTodoAction = (payload: Todo): Action => ({
  type: ADD_TODO,
  payload,
});

export const setUser = (payload: User): Action => ({
  type: SET_USER,
  payload,
});
