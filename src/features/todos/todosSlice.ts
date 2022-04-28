/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../api/api';

const initialState: TodosState = {
  todos: [],
  isTodosLoading: true,
  todosLoadingError: false,
};

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async ():Promise<Todo[]> => request('todos'),
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (todoId: number):Promise<Todo[]> => request(`todos/${todoId}`, {
    method: 'DELETE',
  }),
);

export const todosSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: {
    [getTodos.pending.type]: (state: TodosState) => {
      state.isTodosLoading = true;
      state.todosLoadingError = false;
    },
    [getTodos.fulfilled.type]: (state: TodosState, action) => {
      state.isTodosLoading = false;
      state.todosLoadingError = false;
      state.todos = action.payload;
    },
    [getTodos.rejected.type]: (state: TodosState) => {
      state.isTodosLoading = false;
      state.todosLoadingError = true;
    },
  },
});

export default todosSlice.reducer;
