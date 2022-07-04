export const SET_USER = 'SET_USER';
export const SET_TODOS = 'SET_TODOS';

export const setUserAction = (payload: number): Action => ({
  type: 'SET_USER',
  payload,
});

export const setTodosAction = (payload: Todo[]): Action => ({
  type: 'SET_TODOS',
  payload,
});
