/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface CurrentTodoState {
  currentTodo: Todo | null;
}

const initialState: CurrentTodoState = {
  currentTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      state.currentTodo = action.payload;
    },

    clearCurrentTodo: state => {
      state.currentTodo = null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
