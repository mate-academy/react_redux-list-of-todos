export enum ActionTypes {
  SET_TODOS = 'SET_TODOS',
  SET_USER = 'SET_USER',
  DELETE_TODO = 'DELETE_TODO',
}

export const setTodosAction = (payload: Todo[]): Action => ({
  type: ActionTypes.SET_TODOS,
  payload,
});

export const setUserByIdAction = (payload: User | null): Action => ({
  type: ActionTypes.SET_USER,
  payload,
});

export const deleteTodoAction = (payload: number): Action => ({
  type: ActionTypes.DELETE_TODO,
  payload,
});
