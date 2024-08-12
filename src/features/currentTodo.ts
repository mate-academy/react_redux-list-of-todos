import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    currentTodoReducer(_state, action) {
      return action.payload;
    },
  },
});

export const { currentTodoReducer } = currentTodoSlice.actions;
