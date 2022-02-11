export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';

export const LoadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const LoadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});
