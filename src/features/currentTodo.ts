import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      return action.payload;
    },
    clearTodo: () => {
      return null;
    },
  },
});

export const { setTodo, clearTodo } = currentTodoSlice.actions;
