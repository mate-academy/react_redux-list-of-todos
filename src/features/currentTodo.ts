import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    handleCurrentTodo: (_currentTodo, action: PayloadAction<Todo>) =>
      action.payload,

    clearCurrentTodo: () => null,
  },
});

export default currentTodoSlice.reducer;
export const { handleCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
