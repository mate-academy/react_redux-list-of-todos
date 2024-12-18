/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todos } from '../types/Todos';
import { getTodos } from '../api';

export const init = createAsyncThunk('todos/fetch', () => getTodos());

const initialState: Todos = {
  todos: [],
  loading: false,
  error: '',
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(init.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
