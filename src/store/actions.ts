export enum ActionType {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  DELETE_USER = 'DELETE_USER',
}

export type Action = SetTodosAction | SetUserByIdAction | DeleteTodoByIdAction;

interface SetTodosAction {
  type: ActionType.SET_TODOS,
  payload: Todo[],
}

interface SetUserByIdAction {
  type: ActionType.SET_USER,
  payload: User | null,
}

interface DeleteTodoByIdAction {
  type: ActionType.DELETE_USER,
  payload: number,
}

export const setTodosAction = (payload: Todo[]): SetTodosAction => ({
  type: ActionType.SET_TODOS,
  payload,
});

export const setUserByIdAction = (payload: User | null): SetUserByIdAction => ({
  type: ActionType.SET_USER,
  payload,
});

export const deleteTodoByIdAction
  = (payload: number): DeleteTodoByIdAction => ({
    type: ActionType.DELETE_USER,
    payload,
  });
