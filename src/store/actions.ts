import { Todo, User } from '../react-app-env';

export const LOAD_TODOS = 'LOAD_TODOS';
export const LOAD_USER = 'LOAD_USER';
export const INPUT_VALUE = 'Input_Value';
export const SELECT_VALUE = 'SELECT_VALUE';

export const loadTodosAction = (payload: Todo[]) => ({
  type: LOAD_TODOS,
  payload,
});

export const loadUserAction = (payload: User | null) => ({
  type: LOAD_USER,
  payload,
});

export const setInputValue = (payload: string) => ({
  type: INPUT_VALUE,
  payload,
});

export const setSelectValue = (payload: string) => ({
  type: SELECT_VALUE,
  payload,
});
