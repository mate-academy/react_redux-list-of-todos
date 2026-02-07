import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelected: (_currentTodo, action: PayloadAction<Todo>) => action.payload,
    clearSelected: () => null,
  },
});

export const { setSelected, clearSelected } = currentTodoSlice.actions;
