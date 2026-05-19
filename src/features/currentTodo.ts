/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo | null = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState as Todo | null,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo | null>) => action.payload,
    clearCurrentTodo: () => null,
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
