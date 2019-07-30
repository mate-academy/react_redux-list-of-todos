import { LOAD_TODOS, REMOVE_TODO, ADD_TODO, SORT } from './constants';

export const loadTodos = todos => ({
  type: LOAD_TODOS,
  todos,
});

export const deleteTodo = id => ({
  type: REMOVE_TODO,
  id,
});

export const addTodo = (id, title, username) => ({
  type: ADD_TODO,
  id,
  title,
  username,
});

export const sortBy = (sortType, currentSorting) => ({
  type: SORT,
  sortType,
  currentSorting,
});
