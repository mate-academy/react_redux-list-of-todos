import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo: (_state, action: PayloadAction<Todo | null>) =>
      action.payload,
  },
});

export const { setSelectedTodo } = currentTodoSlice.actions;
export const todoReducer = currentTodoSlice.reducer;
