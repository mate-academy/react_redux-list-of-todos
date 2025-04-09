/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    clearTodo: () => {
      return null;
    },
  },
});

export const { setTodo, clearTodo } = currentTodoSlice.actions;
