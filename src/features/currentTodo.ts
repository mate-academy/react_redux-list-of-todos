import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodos: (currentTodos, { payload }: PayloadAction<Todo>) =>
      payload,
    clear: () => null,
  },
});
