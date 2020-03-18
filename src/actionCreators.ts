import {
  SET_TODOS,
  SORT_BY_COMPLETED,
  SORT_BY_TITLE,
  SORT_BY_NAME,
  ON_DELETE,
} from './constants';

export const setTodosAction = (todos: PreparedTodo[]) => ({
  type: SET_TODOS,
  todos,
});

export const sortByTitleAction = () => ({
  type: SORT_BY_TITLE,
});

export const sortByNameAction = () => ({
  type: SORT_BY_NAME,
});

export const sortByCompletedAction = () => ({
  type: SORT_BY_COMPLETED,
});

export const onDeleteAction = (id: number) => ({
  type: ON_DELETE,
  payload: id,
});
