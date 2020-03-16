import { TodosWithUsers } from './types';
import {
  LOAD_TODOS, SET_LOAD, REMOVE_TODO, SORTED_TODOS,
} from './constants';

export const loadAllTodos = (value: TodosWithUsers) => ({ type: LOAD_TODOS, todos: value });
export const setLoading = (value: boolean) => ({ type: SET_LOAD, isLoading: value });
export const removeTodo = (value: number) => ({ type: REMOVE_TODO, id: value });
export const sortedTodos = (value: TodosWithUsers) => ({ type: SORTED_TODOS, todos: value });
