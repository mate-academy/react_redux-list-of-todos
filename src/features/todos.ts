/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  todos: Todo[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: TodosState = {
  todos: [],
  isLoading: true,
  hasError: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.isLoading = false;
    },
    setError: state => {
      state.hasError = true;
      state.isLoading = false;
    },
  },
});

export const { actions: todosActions } = todosSlice;
