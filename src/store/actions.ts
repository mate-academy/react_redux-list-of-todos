import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { getTodos, getUser } from '../api/api';

const {
  LOAD_TODOS,
  LOAD_USER,
  CLEAR_USER,
  DELETE_TODO,
  TOGGLE_COMPLETED,
  SET_VISIBILITY_FILTER,
} = ActionTypes;

export const loadTodos = () => {
  return async (dispatch: Dispatch) => {
    const response = await getTodos();

    dispatch({
      type: LOAD_TODOS,
      payload: { data: response },
    });
  };
};

export const setVisibileFilter = (filter: string) => {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: { filter },
  };
};

export const toggleCompleted = (id: number) => {
  return {
    type: TOGGLE_COMPLETED,
    payload: { id },
  };
};

export const loadUser = (id: number) => {
  return async (dispatch: Dispatch) => {
    const response = await getUser(id);

    dispatch({
      type: LOAD_USER,
      payload: { data: response },
    });
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const removeTodo = (id: number) => {
  return {
    type: DELETE_TODO,
    payload: { id },
  };
};
