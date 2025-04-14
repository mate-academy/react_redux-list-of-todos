/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

const initialState = {
  todos: [] as Todo[],
  isLoading: false,
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const todos = await getTodos();

  return todos;
});
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchTodos.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
  },
});
