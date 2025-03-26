/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  todos: Todo[];
  isLoading: boolean;
  error: string;
};

const initialState: TodoState = {
  todos: [],
  isLoading: false,
  error: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
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
export const { actions } = todosSlice;
