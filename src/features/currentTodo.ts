import { createSlice, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(_state, action) {
      return action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
