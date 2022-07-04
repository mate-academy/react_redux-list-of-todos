import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  SET_USER = 'SET_USER',
  DELETE_TODO = 'DELETE_TODO',
}

export type Action = SetTodosAction
| AddTodoAction
| DeleteTodoAction
| SetUserAction;

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface AddTodoAction {
  type: ActionType.ADD_TODO,
  payload: Todo,
}

export interface DeleteTodoAction {
  type: ActionType.DELETE_TODO,
  payload: Todo,
}

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

export const setTodosActions = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const addTodoActions = (payload: Todo): Action => ({
  type: ActionType.ADD_TODO,
  payload,
});

export const deleteTodoActions = (payload: Todo): Action => ({
  type: ActionType.DELETE_TODO,
  payload,
});

export const setUserActions = (payload: User | null): Action => ({
  type: ActionType.SET_USER,
  payload,
});
