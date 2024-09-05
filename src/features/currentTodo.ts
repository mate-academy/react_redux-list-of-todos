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
    addCurrentTodo: (state, action: PayloadAction<Todo>) => {
      state.currentTodo = action.payload;
    },

    removeCurrentTodo: state => {
      state.currentTodo = null;
    },
  },
});

export const { addCurrentTodo, removeCurrentTodo } = currentTodoSlice.actions;
export const { reducer: currentTodoReducer } = currentTodoSlice;
export const { name: currentTodoName } = currentTodoSlice;
