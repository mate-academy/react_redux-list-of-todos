import { Action } from '../Types/types';

export const getTodosFromServer = (payload:Todo[]) => ({
  type: Action.ADD_TODOS_FROM_SERVER,
  payload,
});

export const setQuery = (payload:string) => ({
  type: Action.FILTER_BY_NAME,
  payload,
});

export const setSorteredTodos = (payload:Todo[]) => ({
  type: Action.SORT_TODO,
  payload,
});

export const setCompleteStatus = (payload:string) => ({
  type: Action.SET_COMPLETE_STATUS,
  payload,
});

export const setRandom = (payload: Todo[]) => ({
  type: Action.SET_RANDOM,
  payload,
});

export const deleteTodo = (payload: number) => ({
  type: Action.DELETE_TODO,
  payload,
});

export const setUserId = (payload: number) => ({
  type: Action.SET_USER_ID,
  payload,
});

export const getUsersFromServer = (payload: User | null) => ({
  type: Action.ADD_USER,
  payload,
});

export const setLoadingError = (payload: boolean) => ({
  type: Action.IS_LOADING_ERROR,
  payload,
});
