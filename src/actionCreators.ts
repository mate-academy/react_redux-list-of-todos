import { TodosWithUsers } from './types';
import {
  LOAD_TODOS, SET_LOAD, REMOVE_TODO, SET_SORTED,
} from './constants';

export const loadAllTodos = (value: TodosWithUsers) => ({
  type: LOAD_TODOS,
  todos: value,
});

export const setIsLoading = (value: boolean) => ({
  type: SET_LOAD,
  isLoading: value,
});

export const removeTodo = (value: number) => ({
  type: REMOVE_TODO,
  id: value,
});

export const setSortField = (value: string) => ({
  type: SET_SORTED,
  sortField: value,
});
