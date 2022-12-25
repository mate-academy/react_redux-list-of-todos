/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const {
  setTodos, setLoading, setError,
} = todosSlice.actions;
