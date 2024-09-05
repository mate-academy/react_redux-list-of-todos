/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

export const getTodosAsync = createAsyncThunk(
  'todos/getTodosAsync',
  async () => {
    const todos = await getTodos();

    return todos;
  },
);

const initialState = {
  todos: [] as Todo[],
  isLoading: false,
  isError: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: [...state.todos, ...action.payload] };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getTodosAsync.pending, state => {
        return { ...state, isLoading: true, isError: false };
      })
      .addCase(
        getTodosAsync.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          return {
            ...state,
            isLoading: false,
            todos: [...state.todos, ...action.payload],
          };
        },
      )
      .addCase(getTodosAsync.rejected, state => {
        return { ...state, isLoading: false, isError: true };
      });
  },
});

export const { addTodos } = todosSlice.actions;

export default todosSlice.reducer;
