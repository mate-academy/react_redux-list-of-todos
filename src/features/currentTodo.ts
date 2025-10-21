/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (_, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    remove: () => {
      return null;
    },
  },
});

export const actions = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
