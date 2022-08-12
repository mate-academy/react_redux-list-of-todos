export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  DELETE_USER = 'DELETE_USER',
  DELETE_TODO = 'DELETE_TODO',
}

export interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

export interface SetUserAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

export type Action = SetTodosAction
| SetUserAction | DeleteUserAction | DeleteTodoAction;

export interface DeleteUserAction {
  type: ActionType.DELETE_USER,
}

export interface DeleteTodoAction {
  type: ActionType.DELETE_TODO,
  payload: number,
}

export const setTodosAction = (payload: Todo[]) => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserAction = (payload: User | null) => ({
  type: ActionType.SET_USER,
  payload,
});

export const deleteTodoAction = (payload: number) => ({
  type: ActionType.DELETE_TODO,
  payload,
});
