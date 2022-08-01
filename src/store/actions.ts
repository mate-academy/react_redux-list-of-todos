import { Todo, User } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
}

interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

export type Action = SetTodosAction | SetUserAction;

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null): Action => ({
  type: ActionType.SET_USER,
  payload,
});
