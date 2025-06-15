/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    resetCurrent: () => {
      return null;
    },
  },
});

export const { setCurrent, resetCurrent } = currentTodoSlice.actions;
