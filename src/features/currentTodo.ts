import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => {
      return action.payload;
    },
    clearCurrentTodo: () => {
      return null;
    },
  },
});
