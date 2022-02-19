import { Todo, User } from '../react-app-env';

export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const DELETE_TODO = 'DELETE_TODO';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});

export const deleteTodoAction = (payload: number) => ({
  type: DELETE_TODO,
  payload,
});
