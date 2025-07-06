/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

interface TodosState {
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
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setLoading, setTodos, setError } = todosSlice.actions;

export const selectTodos = (state: RootState) => state.todos.items;

export const selectTodosLoading = (state: RootState) => state.todos.loading;

export const selectTodosError = (state: RootState) => state.todos.error;
export type { TodosState };
