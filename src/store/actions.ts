import { Dispatch } from 'redux';
import { ActionTypes } from './types';
import { getTodos, getUser } from '../api/api';

const {
  TODOS_LOAD,
  REMOVE_TODO,
  SET_VISIBILITY_FILTER,
  RANDOMIZE_TODOS,
  USER_LOAD,
  CLEAR_USER,
  TOGGLE_COMPLETED,
} = ActionTypes;

export const todosLoad = () => {
  return async (dispatch: Dispatch) => {
    const jsonData = await getTodos();

    dispatch({
      type: TODOS_LOAD,
      payload: { data: jsonData },
    });
  };
};

export const setVisibilityFilter = (filter: string) => {
  return {
    type: SET_VISIBILITY_FILTER,
    payload: { filter },
  };
};

export const randomizeTodos = () => {
  return {
    type: RANDOMIZE_TODOS,
  };
};

export const removeTodo = (id: number) => {
  return {
    type: REMOVE_TODO,
    payload: { id },
  };
};

export const toggleCompleted = (id: number) => {
  return {
    type: TOGGLE_COMPLETED,
    payload: { id },
  };
};

export const userLoad = (id: number) => {
  return async (dispatch: Dispatch) => {
    const jsonData = await getUser(id);

    dispatch({
      type: USER_LOAD,
      payload: { data: jsonData },
    });
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};
