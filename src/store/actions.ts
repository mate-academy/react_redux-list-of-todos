export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const SET_STATUS = 'SET_STATUS';
export const SET_QUERY = 'SET_QUERY';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});

export const setStatusAction = (payload: string) => ({
  type: SET_STATUS,
  payload,
});
