import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    clearCurrentTodo: () => {
      return null;
    },
  },
});
export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
