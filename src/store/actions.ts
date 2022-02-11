export const LOAD_TODOS = 'LOAD_TODOS';
export const DELETE_TODO = 'CLEAR_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const SAVE_INPUT = 'SAVE_INPUT';
export const SELECT_OPTION = 'SELECT_OPTION';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const deleteTodoAction = (payload: number) => ({
  type: DELETE_TODO,
  payload,
});

export const loadUserAction = (payload: User) => ({
  type: LOAD_USER,
  payload,
});

export const clearUserAction = () => ({
  type: CLEAR_USER,
});

export const saveInputAction = (event: React.ChangeEvent<HTMLInputElement>) => ({
  type: SAVE_INPUT,
  payload: event.target.value,
});

export const selectOptionAction = (event: React.ChangeEvent<HTMLSelectElement>) => ({
  type: SELECT_OPTION,
  payload: event.target.value,
});
