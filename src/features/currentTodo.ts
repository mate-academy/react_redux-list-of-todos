import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (_state, action: PayloadAction<Todo>) => action.payload,
    clearSelectedTodo: () => null,
  },
});

export const { selectTodo, clearSelectedTodo } = currentTodoSlice.actions;
