import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
}

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface SetUsersAction {
  type: ActionType.SET_USER,
  payload: User,
}

export interface RemoveUserAction {
  type: ActionType.REMOVE_USER,
}

export type Action = SetTodosAction | SetUsersAction | RemoveUserAction;

export const setTodosAction = (payload: Todo[]) => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User) => ({
  type: ActionType.SET_USER,
  payload,
});

export const removeSelectedUser = () => ({
  type: ActionType.REMOVE_USER,
});
