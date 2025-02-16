/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type TodosState = {
  arrayOfTodos: Todo[] | null;
  loading: boolean;
  error: boolean;
};

const initialState: TodosState = {
  arrayOfTodos: null,
  loading: false,
  error: false,
};

export const init = createAsyncThunk('todos/fetch', getTodos);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, state => {
      state.loading = true;
      state.error = state.error && false;
    });

    builder.addCase(init.fulfilled, (state, action) => {
      state.arrayOfTodos = action.payload;
      state.loading = false;
    });

    builder.addCase(init.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default todosSlice.reducer;
