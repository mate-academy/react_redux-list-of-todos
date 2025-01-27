import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type Todos = {
  todos: Todo[];
  isLoading: boolean;
  error: boolean;
};

const initialState: Todos = {
  todos: [] as Todo[],
  isLoading: false,
  error: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload as Todo[];
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { setTodos, setIsLoading, setError } = todosSlice.actions;
