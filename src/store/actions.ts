export const SET_TODOS = 'SET_TODOS';
export const GET_USER = 'GET_USER';

export const setTodosAction = (payload: Todo[]): Action => ({
  type: SET_TODOS,
  payload,
});

export const getUserAction = (payload: User): Action => ({
  type: GET_USER,
  payload,
});
