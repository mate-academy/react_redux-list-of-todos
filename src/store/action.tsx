export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  DELETE_USER = 'DELETE_USER',
}

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

export type Action = SetTodosAction | SetUserAction | DeleteUserAction;

export interface DeleteUserAction {
  type: ActionType.DELETE_USER,
}

export const setTodosAction = (payload: Todo[]) => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null) => ({
  type: ActionType.SET_USER,
  payload,
});
