import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface InitialState {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos.push(...action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});
