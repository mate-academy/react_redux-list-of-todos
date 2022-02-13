import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { ReducerActions } from './reducer';

export const setUserIdAction = (id: number) => {
  return {
    type: ReducerActions.SET_USER_ID,
    payload: id,
  };
};

export const fetchTodosAction = () => {
  return { type: ReducerActions.FETCH_TODOS };
};

export const fetchTodosSuccessAction = (todos: Todo[]) => {
  return {
    type: ReducerActions.FETCH_TODOS_SUCCESS,
    payload: todos,
  };
};

export const fetchTodosErrorAction = (message: string) => {
  return {
    type: ReducerActions.FETCH_TODOS_ERROR,
    payload: message,
  };
};

export const fetchTodos = () => async (dispatch: Dispatch<AnyAction>) => {
  const TODOS_URL = 'https://mate.academy/students-api/todos';
  const todos = await (await fetch(TODOS_URL)).json();

  try {
    dispatch(fetchTodosAction());
    dispatch(fetchTodosSuccessAction(todos));
  } catch {
    dispatch(fetchTodosErrorAction('Failed to fetch todos'));
  }
};
