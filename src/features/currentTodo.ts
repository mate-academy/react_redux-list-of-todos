/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, User } from '../types/Todo';

const initialState = {
  todo: null as Todo | null,
  user: null as User | null,
  isLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodoLoading(state) {
      state.isLoading = true;
    },
    setTodo(state, action: PayloadAction<Todo>) {
      state.todo = action.payload;
      state.user = null;
      state.isLoading = true;
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isLoading = false;
    },
    clearTodo(state) {
      state.todo = null;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setTodoLoading, setTodo, setUser, clearTodo } =
  currentTodoSlice.actions;
export const currentTodoReducer = currentTodoSlice.reducer;
