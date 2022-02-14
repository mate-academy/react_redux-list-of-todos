import { Todo, User } from '../react-app-env';

export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const LOAD_VISIBLE_TODOS = 'LOAD_VISIBLE_TODOS';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadVisibleTodosAction = (payload: Todo[]) => ({
  type: LOAD_VISIBLE_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});
