import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addTodo: (_, action: PayloadAction<Todo>) => action.payload,
    clearTodo: () => null,
  },
});
