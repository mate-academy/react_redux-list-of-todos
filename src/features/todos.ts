import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = { items: Todo[]; loading: boolean; error: string };

const initialState: TodosState = {
  items: [],
  loading: false,
  error: '',
};

export const todosSlice: Slice<TodosState> = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
});

export const { actions } = todosSlice;
