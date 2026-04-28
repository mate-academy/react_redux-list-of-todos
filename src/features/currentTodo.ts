/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    SetCurrentTodo: (state, action) => {
      return action.payload;
    },
  },
});

export const { SetCurrentTodo } = currentTodoSlice.actions;
