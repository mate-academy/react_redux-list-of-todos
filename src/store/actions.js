import {
  ADD_TODOS,
  FILTER_TODOS_BY,
  ONLY_ACTIVE_TODOS,
  ONLY_COMPLETED_TODOS,
  SHOW_ALL_TODOS,
} from './todosReducer';
import { SHOW_USER_INFO } from './userInfoReducer';

export const addTodosAction = (payload) => ({ type: ADD_TODOS, payload });
export const showAllTodosActions = () => ({ type: SHOW_ALL_TODOS });
export const onlyActiveTodosActions = () => ({ type: ONLY_ACTIVE_TODOS });
export const onlyCompletedTodosActions = () => ({ type: ONLY_COMPLETED_TODOS });
export const filterTodosByActions = (payload) => ({ type: FILTER_TODOS_BY, payload });

export const userInfoAction = (payload) => ({ type: SHOW_USER_INFO, payload });
