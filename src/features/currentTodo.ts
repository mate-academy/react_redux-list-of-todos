import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_state, action: PayloadAction<Todo>) => action.payload,
    clearTodo: () => null,
  },
});

export const { setTodo, clearTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
