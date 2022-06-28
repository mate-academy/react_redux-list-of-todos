import { Todo, User } from '../react-app-env';

export const LOADING_TODOS = 'LOADING_TODOS';
export const SHOW_USER = 'SHOW_USER';
export const DELETE_TODO = 'DELETE_TODO';

export const actionTodos = (payload: Todo[]) => ({
  type: LOADING_TODOS,
  payload,
});

export const showUserFromServer = (payload: User | null) => ({
  type: SHOW_USER,
  payload,
});

export const deleteTodoAction = (payload: number) => ({
  type: DELETE_TODO,
  payload,
});
