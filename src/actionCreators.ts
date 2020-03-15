import { TodosWithUsers } from './types';
import {
  LOAD_TODOS, REMOVE_TODO, SORT_BY_NAME, SORT_BY_TITLE, SORT_BY_COMPLETED,
} from './constants';

export const loadTodo = (value: TodosWithUsers) => ({ type: LOAD_TODOS, todos: value });
export const removeTodo = (value: number) => ({ type: REMOVE_TODO, id: value });
export const sortByName = ({ type: SORT_BY_NAME });
export const sortByTitle = ({ type: SORT_BY_TITLE });
export const sortByCompleted = ({ type: SORT_BY_COMPLETED });
