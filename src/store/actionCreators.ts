import {
  SET_DELETE,
  SET_LOADING,
  SET_TODOS,
  SORT_BY_ID,
  SORT_BY_NAME,
  SORT_BY_STATUS,
  SORT_BY_TITLE,
} from './constants';
import { State, TodoWithUser } from '../constants/types';

export const setTodos = (value: TodoWithUser[]) => ({
  type: SET_TODOS,
  value,
});
export const setLoading = (value: boolean) => ({
  type: SET_LOADING,
  value,
});
export const deleteTodo = (value: number) => ({
  type: SET_DELETE,
  value,
});
export const sortByTitle = () => ({
  type: SORT_BY_TITLE,
});
export const sortByName = () => ({
  type: SORT_BY_NAME,
});
export const sortById = () => ({
  type: SORT_BY_ID,
});
export const sortByStatus = () => ({
  type: SORT_BY_STATUS,
});

export const getLoading = (state: State) => state.isLoading;
export const getTodos = (state: State) => state.todos;
