import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Todo>) => action.payload,
    clear: () => null,
  },
});

export const { set, clear } = currentTodoSlice.actions;
