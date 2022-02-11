export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const SET_USER_ID = 'SET_USERID';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});

export const setUserId = (payload: number) => ({
  type: SET_USER_ID,
  payload,
});
