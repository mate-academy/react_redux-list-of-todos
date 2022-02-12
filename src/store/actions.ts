export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const SET_USER = 'SET_USER';
export const SET_TITLE_FILTER = 'SET_TITLE_FILTER';
export const SET_STATUS_FILTER = 'SET_STATUS_FILTER';
export const SET_ERROR = 'SET_ERROR';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User) => ({
  type: LOAD_USER,
  payload,
});

export const setUserAction = (payload: number) => ({
  type: SET_USER,
  payload,
});

export const setTitleFilterAction = (payload: string) => ({
  type: SET_TITLE_FILTER,
  payload,
});

export const setStatusFilterAction = (payload: string) => ({
  type: SET_STATUS_FILTER,
  payload,
});

export const setErrorAction = (payload: boolean) => ({
  type: SET_ERROR,
  payload,
});
