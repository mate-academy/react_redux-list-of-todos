import {
  IS_LOADING,
  SET_TODOS,
  DELETE_TODO,
  SET_SORT_TYPE,
} from './actionTypes';

export const setIsLoadind = (value: boolean) => ({
  type: IS_LOADING,
  isLoading: value,
});

export const setTodos = (preparedTodos: PreparedTodo[]) => ({
  type: SET_TODOS,
  todos: preparedTodos,
});

export const deleteTodo = (id: number) => ({
  type: DELETE_TODO,
  id,
});

export const setSortType = (sortType: string) => ({
  type: SET_SORT_TYPE,
  typeOfSort: sortType,
});
