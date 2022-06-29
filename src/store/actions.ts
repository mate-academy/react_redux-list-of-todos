import { Todo, User } from '../react-app-env';

export type Action = {
  type: ActionType,
  payload: any
};

export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
}

export const setTodosAction = (payload: Todo[]) => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null) => ({
  type: ActionType.SET_USER,
  payload,
});
