import { User, Todo } from '../react-app-env';

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
}

interface SetTodos {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

interface SetUser {
  type: ActionType.SET_USER,
  payload: User | null,
}

export type Action = SetTodos | SetUser;

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null): Action => ({
  type: ActionType.SET_USER,
  payload,
});
