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
/* eslint-disable no-param-reassign */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (state:TodosState, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state:TodosState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state:TodosState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { actions } = todosSlice;

export default todosSlice.reducer;
