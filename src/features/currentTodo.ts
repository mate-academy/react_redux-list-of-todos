import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState,
  reducers: {
    chooseTodo(_state, { payload }: PayloadAction<Todo>) {
      // eslint-disable-next-line no-param-reassign
      return payload;
    },
    clearCurrentTodo() {
      // eslint-disable-next-line no-param-reassign
      return null;
    },
  },
});
