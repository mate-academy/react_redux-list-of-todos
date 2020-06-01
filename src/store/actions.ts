import {
  LOAD_TODOS,
  SET_LOADING,
  SET_LOADED, SET_SORT_TYPE, REMOVE_TODO,
} from './constants';

export const setTodos = (data: Todos) => ({
  type: LOAD_TODOS,
  todos: data,
});

export const setIsLoading = (data: boolean) => ({
  type: SET_LOADING,
  isLoading: data,
});

export const setIsLoaded = (data: boolean) => ({
  type: SET_LOADED,
  isLoaded: data,
});

export const setSortType = (data: string) => ({
  type: SET_SORT_TYPE,
  sortType: data,
});

export const removeTodo = (data: number) => ({
  type: REMOVE_TODO,
  id: data,
});
