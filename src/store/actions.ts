import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  ADD_TODO = 'ADD_TODO',
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
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
  payload: User,
}

export interface SetUserCleaner {
  type: ActionType.CLEAR_USER,
  payload: null,
}

export interface DeleteUser {
  type: ActionType.CLEAR_USER,
  payload: null,
}

export type Action = SetTodosAction
| AddTodoAction
| SetUserAction
| SetUserCleaner;

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const addTodoAction = (payload: Todo): Action => ({
  type: ActionType.ADD_TODO,
  payload,
});

export const setUserAction = (payload: User): Action => ({
  type: ActionType.SET_USER,
  payload,
});

export const cleanUserAction = (payload: null): Action => ({
  type: ActionType.CLEAR_USER,
  payload,
});
