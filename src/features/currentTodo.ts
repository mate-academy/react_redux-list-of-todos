import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'features',
  initialState: initialState,
  reducers: {
    currentTodo(state, action: PayloadAction<Todo>) {
      return action.payload;
    },
    clearCurrentTodo() {
      return null;
    },
  },
});

export const { currentTodo, clearCurrentTodo } = currentTodoSlice.actions;
