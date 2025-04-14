/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTodos } from '../api';
import { Todo } from '../types/Todo';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', getTodos);

export interface TodosState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TodosState = {
  todos: [],
  status: 'idle',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, state => {
        state.status = 'failed';
      });
  },
});

export default todosSlice.reducer;
