import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/Todo';

interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { setTodos, setLoading, setError } = todosSlice.actions;
export default todosSlice.reducer;
