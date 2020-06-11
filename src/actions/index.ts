import {
  START_LOADING,
  INIT_TODOS,
  DELETE_TODO,
  FINISH_LOADING,
  SET_QUERY, SORT_BY,
} from './types'


export const startLoading = () => ({type: START_LOADING});
export const finishLoading = () => ({type: FINISH_LOADING});

export const initTodos = (todos: Todo[]) => ({
  type: INIT_TODOS,
  todos
});

export const deleteTodo = (todoId: number) => ({
  type: DELETE_TODO,
  todoId
});

export const setQuery = (query: string) => ({
  type: SET_QUERY,
  query
});


export const sortBy = (field: string) => ({
  type: SORT_BY,
  field
});
