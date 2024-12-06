/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface CurrentTodoState {
  currentTodo: Todo | null;
  loading: boolean;
}

const initialState: CurrentTodoState = {
  currentTodo: null,
  loading: false,
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

    startLoading: state => {
      state.loading = true;
    },
    stopLoading: state => {
      state.loading = false;
    },
  },
});

export const { addCurrentTodo, removeCurrentTodo, startLoading, stopLoading } = currentTodoSlice.actions;
export const { reducer: currentTodoReducer } = currentTodoSlice;
export const { name: currentTodoName } = currentTodoSlice;
