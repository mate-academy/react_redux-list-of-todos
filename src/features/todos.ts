import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';
import { RootState } from '../app/store';

export interface Todos {
  todos: Todo[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Todos = {
  todos: [],
  loaded: true,
  hasError: false,
};

export const loadTodoFromServer = createAsyncThunk<Todo[]>(
  'todos/getTodosFromServer',
  () => getTodos(),
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadTodoFromServer.fulfilled, (state, action) => {
        return {
          ...state,
          todos: action.payload,
          loaded: true,
        };
      })
      .addCase(loadTodoFromServer.pending, state => {
        return {
          ...state,
          loaded: false,
        };
      })
      .addCase(loadTodoFromServer.rejected, state => {
        return {
          ...state,
          loaded: true,
          hasError: true,
        };
      });
  },
});

export const selectTodosLoaded = (state: RootState) =>
  state.todosReducer.loaded;
export const selectTodos = (state: RootState) => state.todosReducer.todos;
export default todosSlice.reducer;
