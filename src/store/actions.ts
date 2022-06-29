import { Todo, User } from '../react-app-env';

// export const SET_TODOS = 'SET_TODOS';
// export const SET_USER = 'SET_USER';
// export const REMOVE_USER = 'REMOVE_USER';

enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
}

export interface Action {
  type: ActionType,
  payload?: any,
}

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User): Action => ({
  type: ActionType.SET_USER,
  payload,
});

export const removeSelectedUser = (): Action => ({
  type: ActionType.REMOVE_USER,
});
