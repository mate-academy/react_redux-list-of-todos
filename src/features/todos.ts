/* eslint-disable */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    startLoading: state => {
      state.loading = true;
      state.error = null;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.loading = false;
      state.items = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startLoading, setTodos, setError } = todosSlice.actions;

export default todosSlice.reducer;
