import { Todo, User } from '../react-app-env';

// Action types - is just a constant. MUST have a unique value.
export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
}

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

// Action creators - a function returning an action object
export const setTodosAction = (payload: Todo[]): SetTodosAction => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUser = (payload: User | null): SetUserAction => ({
  type: ActionType.SET_USER,
  payload,
});
