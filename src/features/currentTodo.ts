/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  todo: null as Todo | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      state.todo = action.payload;
    },
  },
});

export default currentTodoSlice.reducer;

export const { setCurrentTodo } = currentTodoSlice.actions;
