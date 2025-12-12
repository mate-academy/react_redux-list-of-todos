/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  todos: Todo[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: TodosState = {
  todos: [],
  loaded: false,
  hasError: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      state.loaded = true;
      state.hasError = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loaded = !action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.hasError = action.payload;
    },
  },
});

export const { setTodos, setLoading, setError } = todosSlice.actions;
export default todosSlice.reducer;
