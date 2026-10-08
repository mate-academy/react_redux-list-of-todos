import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setPost: (_state, action) => {
      return action.payload;
    },
    clearPost: (_state, action) => {
      return action.payload;
    },
  },
});
