/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [] as Todo[],
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    loadTodos: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
  },
});

export const { loadTodos, setLoading } = todosSlice.actions;
