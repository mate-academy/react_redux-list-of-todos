/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    toggleTodo: (state, action: PayloadAction<Todo>) => {
      // If it is already toggled, toggle off
      if (state?.id === action.payload.id) {
        return null;
      }

      // toggle on
      return action.payload;
    },
  },
});
