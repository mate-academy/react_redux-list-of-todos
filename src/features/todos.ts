/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../types/Todo';

type MyState = {
  loading: boolean;
  todos: TodoType[] | null;
  error: string | null;
};

const initialState: MyState = {
  todos: null,
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchStarted(state) {
      state.loading = true;
      state.error = '';
    },

    fetchSucces(state, action) {
      state.todos = action.payload;
      state.loading = false;
    },

    fetchFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchStarted, fetchSucces, fetchFailed } = todosSlice.actions;
