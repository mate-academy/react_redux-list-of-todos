import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getTodos } from '../api';

import { Todo } from '../types/Todo';

type InitialState = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: InitialState = {
  todos: [],
  loading: false,
  error: '',
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await getTodos();

  return response;
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTodos.pending, state => ({
      ...state,
      loading: true,
    }));
    builder.addCase(fetchTodos.fulfilled, (state, action) => ({
      ...state,
      todos: action.payload,
      loading: false,
    }));
    builder.addCase(fetchTodos.rejected, state => ({
      ...state,
      loading: false,
      error: 'Something went wrong',
    }));
  },
});
