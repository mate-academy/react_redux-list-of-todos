/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    clear: () => {
      return null;
    },
  },
});

export const { set: setCurrentTodo, clear: clearCurrentTodo } =
  currentTodoSlice.actions;

export default currentTodoSlice.reducer;
