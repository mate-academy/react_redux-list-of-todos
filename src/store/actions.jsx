import { getTodos, getUser } from '../API/api';
import {
  SELECT_USER,
  CLEAR_USER_ID,
  SORT_BY_TYPE,
  GET_TODOS,
  SORT_BY_QUERY,
  SORT_BY_ACTIVE,
  SORT_BY_ALL,
  SORT_BY_COMPLETED,
  USER_PROFILE,
} from './types';

export const selectUser = id => ({
  type: SELECT_USER,
  payload: id,
});

export const getUserProfileById = id => async(dispatch) => {
  const response = await getUser(id);

  dispatch({
    type: USER_PROFILE,
    payload: response,
  });
};

export const clearUserId = () => ({
  type: CLEAR_USER_ID,
});

export const sortByType = option => ({
  type: SORT_BY_TYPE,
  payload: option,
});

export const fetchTodos = () => async(dispatch) => {
  const response = await getTodos();

  return dispatch({
    type: GET_TODOS,
    payload: response,
  });
};

export const sortByQuery = query => ({
  type: SORT_BY_QUERY,
  payload: query,
});

export const sortByAll = () => ({
  type: SORT_BY_ALL,
});

export const sortByCompleted = () => ({
  type: SORT_BY_COMPLETED,
});

export const sortByActive = () => ({
  type: SORT_BY_ACTIVE,
});
