import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { actions } = todosSlice;
export default todosSlice.reducer;
