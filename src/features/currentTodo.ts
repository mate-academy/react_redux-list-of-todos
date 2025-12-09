import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo | null>) =>
      action.payload,
    clearCurrentTodo: () => initialState,
  },
});
export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
