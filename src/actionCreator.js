import {
  LOAD_TODOS, REMOVE_TODO, ADD_TODO, SORT,
} from './constants';

export const loadAction = todos => ({
  type: LOAD_TODOS,
  todos,
});

export const deleteAction = id => ({
  type: REMOVE_TODO,
  id,
});

export const addAction = (id, title, username) => ({
  type: ADD_TODO,
  id,
  title,
  username,
});

export const sortAction = (sortType, currentSorting) => ({
  type: SORT,
  sortType,
  currentSorting,
});
