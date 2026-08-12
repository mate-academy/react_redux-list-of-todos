import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
/* eslint-disable no-param-reassign */

const initialState = {
  value: null as Todo | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default currentTodoSlice.reducer;
export const { setCurrentTodo } = currentTodoSlice.actions;
