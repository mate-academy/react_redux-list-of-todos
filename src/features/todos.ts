/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

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

export const init = createAsyncThunk('todos/fetch', () => {
  return getTodos();
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = 'Error';
    });
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
