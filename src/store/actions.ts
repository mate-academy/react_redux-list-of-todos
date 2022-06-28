import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  DELETE_TODO = 'DELETE_TODO',
}

export interface SetTodosAction {
  type:ActionType.SET_TODOS,
  payload: Todo[],
}

export interface SetUserAction {
  type:ActionType.SET_USER,
  payload: User | null,
}

export interface DeleteTodoAction {
  type:ActionType.DELETE_TODO,
  payload: Todo[],
}

export type Action = SetTodosAction | SetUserAction | DeleteTodoAction;

export const setTodosAction = (payload: Todo[]):Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null):Action => ({
  type: ActionType.SET_USER,
  payload,
});

export const setDeleteTodoAction = (payload: Todo[]):Action => ({
  type: ActionType.DELETE_TODO,
  payload,
});
