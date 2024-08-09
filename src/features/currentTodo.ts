import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setTodo: (_state, action: PayloadAction<Todo>) => action.payload,
    deleteTodo: () => null,
  },
});

export const { setTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
