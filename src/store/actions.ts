export const LOAD_TODOS = 'TODOS';
export const LOAD_USER = 'USER';
export const SET_STATUS_VALUE = 'STATUS';
export const SET_TITLE_VALUE = 'TITLE';

export const loadTodosActions = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});

export const setStatusValue = (payload: string) => ({
  type: SET_STATUS_VALUE,
  payload,
});

export const setTitleValue = (payload: string) => ({
  type: SET_TITLE_VALUE,
  payload,
});
