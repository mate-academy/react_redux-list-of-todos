export const SET_TODOS = 'SET_TODOS';
export const SELECT_USER = 'SELECT_USER';

export const setTodosAction = (payload: Todo[]): Action => ({
  type: SET_TODOS,
  payload,
});

// функція повертає ({})

export const selectUserAction = (payload: User): Action => ({
  type: SELECT_USER,
  payload,
});
