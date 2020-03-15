import { TodoType, UserType } from '../utils/interfaces';
import {
  SET_TODOS,
  SET_IS_LOADING,
  SET_IS_LOADED,
  SET_ERROR,
  REMOVE_TODO,
  SET_USERS,
  SET_SORT_FIELD,
} from './actionTypes';

export const setTodos = (todos: TodoType[]) => ({
  type: SET_TODOS,
  payload: todos,
});

export const setUsers = (users: UserType[]) => ({
  type: SET_USERS,
  payload: users,
});

export const startLoading = () => ({
  type: SET_IS_LOADING,
  payload: true,
});

export const stopLoading = () => ({
  type: SET_IS_LOADING,
  payload: false,
});

export const setIsLoaded = () => ({
  type: SET_IS_LOADED,
  payload: true,
});

export const setError = () => ({
  type: SET_ERROR,
  payload: true,
});

export const setNoError = () => ({
  type: SET_ERROR,
  payload: false,
});

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id,
});

export const setSortField = (field: string) => ({
  type: SET_SORT_FIELD,
  payload: field,
});
