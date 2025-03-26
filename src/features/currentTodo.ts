import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  currentTodo: null as Todo | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action) {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = action.payload;
    },

    clearCurrentTodo(state) {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
