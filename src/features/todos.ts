/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoState = {
  items: Todo[];
  loading: boolean;
};

const initialState: TodoState = {
  items: [],
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart(state) {
      state.loading = true;
    },
    fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchTodosStart, fetchTodosSuccess } = todosSlice.actions;
