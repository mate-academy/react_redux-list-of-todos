import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface InitialState {
  todos: Todo[];
  isLoading: boolean;
  error: string;
}

const initialState: InitialState = {
  todos: [],
  isLoading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
