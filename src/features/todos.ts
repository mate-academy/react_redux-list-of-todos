import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type TodosState = {
  items: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodosState = {
  items: [],
  loading: true,
  error: '',
};

export const loadTodos = createAsyncThunk('todos/load', () => getTodos());

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTodos.pending, state => ({
        ...state,
        loading: true,
        error: '',
      }))
      .addCase(loadTodos.fulfilled, (state, action) => ({
        ...state,
        loading: false,
        items: action.payload,
      }))
      .addCase(loadTodos.rejected, state => ({
        ...state,
        loading: false,
        error: 'Failed to load todos.',
      }));
  },
});
