/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  currentTodo: null as Todo | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.currentTodo = action.payload;
    },
  },
});

export const { setTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
