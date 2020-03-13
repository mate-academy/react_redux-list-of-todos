import { State, TodoWithUser } from '../constants/types';


export enum ActionTypes {
  SET_DELETE = 'SET_DELETE',
  SET_LOADING = 'SET_LOADING',
  SET_TODOS = 'SET_TODOS',
  SORT_BY_ID = 'SORT_BY_ID',
  SORT_BY_NAME = 'SORT_BY_NAME',
  SORT_BY_STATUS = 'SORT_BY_STATUS',
  SORT_BY_TITLE = 'SORT_BY_TITLE',
}

export const setTodos = (value: TodoWithUser[]) => ({
  type: ActionTypes.SET_TODOS,
  payload: value,
});
export const setLoading = (value: boolean) => ({
  type: ActionTypes.SET_LOADING,
  payload: value,
});
export const deleteTodo = (value: number) => ({
  type: ActionTypes.SET_DELETE,
  payload: value,
});
export const sortByTitle = () => ({
  type: ActionTypes.SORT_BY_TITLE,
});
export const sortByName = () => ({
  type: ActionTypes.SORT_BY_NAME,
});
export const sortById = () => ({
  type: ActionTypes.SORT_BY_ID,
});
export const sortByStatus = () => ({
  type: ActionTypes.SORT_BY_STATUS,
});

export const getLoading = (state: State) => state.isLoading;
export const getTodos = (state: State) => state.todos;
