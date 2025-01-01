import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { loadTodos, setLoading, setError } = todosSlice.actions;
