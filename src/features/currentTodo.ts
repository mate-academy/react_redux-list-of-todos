import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo | null = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => action.payload,
    clearCurrentTodo: () => null,
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
