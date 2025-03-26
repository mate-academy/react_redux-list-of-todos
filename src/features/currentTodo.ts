import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    clearSelectedTodo: () => {
      return null;
    },
  },
});

export const { setSelectedTodo, clearSelectedTodo } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
