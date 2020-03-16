import { PreparedTodo } from '../constants_types/types';
import {
  SET_IS_LOADING,
  SET_IS_LOADED,
  SET_TODOS,
  SET_SELECTED_SORT,
  DELETE_TASK,
} from '../constants_types/constants';

export const setIsLoading = (status: boolean) => ({
  type: SET_IS_LOADING,
  isLoading: status,
});

export const setIsLoaded = () => ({
  type: SET_IS_LOADED,
  isLoaded: true,
});

export const setTodos = (todosFromApi: PreparedTodo[]) => ({
  type: SET_TODOS,
  todos: todosFromApi,
});

export const deleteTask = (id: number) => ({
  type: DELETE_TASK,
  id,
});

export const setSelectedSort = (sort: string) => ({
  type: SET_SELECTED_SORT,
  selectedSort: sort,
});
