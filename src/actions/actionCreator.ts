import {
  LOAD_FROM_API,
  SORT_BY_NAME,
  SORT_BY_TITLE,
  SORT_BY_COMPLETE,
  DELETE_TASK,
} from '../constants/constants';

export const setTodos = (todos: PreparedTodo[]) => ({ type: LOAD_FROM_API, payload: todos });
export const sortByName = () => ({ type: SORT_BY_NAME });
export const sortByTitle = () => ({ type: SORT_BY_TITLE });
export const sortByComplete = () => ({ type: SORT_BY_COMPLETE });
export const deleteTask = (id: number) => ({ type: DELETE_TASK, id });
