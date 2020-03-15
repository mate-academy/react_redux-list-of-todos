import { PreparedTodoType } from '../utils/interfaces';
import {
  SetTodosAction,
  SetLoadingAction,
  SetLoadedAction,
  SetSortFieldAction,
  DeleteTodoAction,
  ActionTypes,
} from './actionTypes';

export const setTodosAction = (todos: PreparedTodoType[]): SetTodosAction => ({
  type: ActionTypes.SetTodos,
  payload: todos,
});

export const setLoadingAction = (isLoading: boolean): SetLoadingAction => ({
  type: ActionTypes.SetLoading,
  payload: isLoading,
});

export const setLoadedAction = (isLoaded: boolean): SetLoadedAction => ({
  type: ActionTypes.SetLoaded,
  payload: isLoaded,
});

export const setSortFieldAction = (sortBy: string): SetSortFieldAction => ({
  type: ActionTypes.SetSortField,
  payload: sortBy,
});

export const deleteTodoAction = (id: number): DeleteTodoAction => ({
  type: ActionTypes.DeleteTodo,
  payload: id,
});
