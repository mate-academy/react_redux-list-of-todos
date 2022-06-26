export const SET_TODOS = 'SET_TODOS';
export const SET_USER = 'SET_USER';

export const setTodosAction = (payload: Todo[]) => ({
  type: SET_TODOS,
  payload,
});

export const setUserByIdAction = (payload: User | null) => ({
  type: SET_USER,
  payload,
});
