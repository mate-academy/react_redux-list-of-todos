export const LOAD_TODOS = 'LOAD_TODOS';

export const loadTodosActions = (payload: Todo) => ({
  type: LOAD_TODOS,
  payload,
});

export const LOAD_USER = 'LOAD_USER';

export const loadUserAction = (payload: User) => ({
  type: LOAD_USER,
  payload,
});

export const CLEAR_USER = 'CLEAR_USER';

export const clearSelectedUser = () => ({
  type: CLEAR_USER,
});

export const INPUT_VALUE = 'Input_Value';

export const setInputValue = (payload: string) => ({
  type: INPUT_VALUE,
  payload,
});

export const SELECT_VALUE = 'SELECT_VALUE';

export const setSelectValue = (payload: string) => ({
  type: SELECT_VALUE,
  payload,
});
