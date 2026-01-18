import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    open(_, action: PayloadAction<Todo>) {
      return action.payload;
    },

    close() {
      return null;
    },
  },
});

export const { open, close } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
