import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
  },
});

export const { set: setCurrentTodo } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
