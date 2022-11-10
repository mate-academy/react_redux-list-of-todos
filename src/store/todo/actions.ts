import { Todo } from '../../react-app-env';

export const LOAD_TODOS = 'LOAD_TODOS';
export const SET_STATUS = 'SET_STATUS';
export const SET_QUERY = 'SET_QUERY';
export const TODOS_BY_QUERY = 'TODOS_BY_QUERY';
export const CHECKBOX_STATUS = 'CHECKBOX_STATUS';

export const loadTodos = (todos: Todo[]) => ({
  type: LOAD_TODOS, todos,
});
export const setStatus = (status: string) => ({
  type: SET_STATUS, status,
});
export const setQuery = (query: string) => ({
  type: SET_QUERY, query,
});
export const getTodosByQuery = (query: string) => ({
  type: TODOS_BY_QUERY, query,
});
export const changeCheckBoxStatus = (todoId: number) => ({
  type: CHECKBOX_STATUS, todoId,
});
