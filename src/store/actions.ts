import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  SET_USER = 'SET_USER',
}

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface AddTodoAction {
  type: ActionType.ADD_TODO,
  payload: Todo,
}

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

export type Action = SetTodosAction
| AddTodoAction
| SetUserAction;

export const setTodosActions = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const addTodoActions = (payload: Todo): Action => ({
  type: ActionType.ADD_TODO,
  payload,
});

export const setUserActions = (payload: User | null): Action => ({
  type: ActionType.SET_USER,
  payload,
});
