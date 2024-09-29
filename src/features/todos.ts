import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import {getTodos} from '../api';

export type TodosState = {
  todos: Todo[],
  loading: boolean,
  error: string,
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: '',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoader: (state, action: PayloadAction<boolean>) => {state.loading = action.payload},
  },
  extraReducers: (builder) => {
      builder.addCase(init.pending, (state) => {
        state.loading = true;
      })

      .addCase(init.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.loading = false;
      })

      .addCase(init.rejected, (state) => {
        state.loading = false;
        state.error = 'Error';
      });
  },
});

export default todosSlice.reducer;

export const { actions } = todosSlice;

export const init = createAsyncThunk('todos/fetch', () => {
  return getTodos();
});
