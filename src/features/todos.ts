import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: boolean;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
  },
});

export const { actions } = todosSlice;
