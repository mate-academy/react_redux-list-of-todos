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

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User,
}

export interface RemoveUserAction {
  type: ActionType.REMOVE_USER,
}

export type Action = SetTodosAction | SetUserAction | RemoveUserAction;

export const setTodosAction = (payload: Todo[]) => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null) => ({
  type: ActionType.SET_USER,
  payload,
});

export const removeUserAction = () => ({
  type: ActionType.REMOVE_USER,
});
