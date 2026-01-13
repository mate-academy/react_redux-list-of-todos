/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { TodoType } from '../types/Todo';

type MyState = {
  loadingUser: boolean;
  user: User | null;
  error: string | null;
  currentTodo: TodoType | null;
};

const initialState: MyState = {
  user: null,
  loadingUser: false,
  error: null,
  currentTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    startFetch(state) {
      state.loadingUser = true;
      state.error = null;
    },

    fetchUserSuccesfull(state, action) {
      state.loadingUser = false;
      state.error = null;
      state.user = action.payload;
    },

    fetchUserFailed(state, action) {
      state.loadingUser = false;
      state.error = action.payload;
    },
    setCurrentTodo(state, action) {
      state.currentTodo = action.payload;
    },

    unsetCurrentTodo(state) {
      state.currentTodo = null;
    },
  },
});

export const {
  fetchUserSuccesfull,
  fetchUserFailed,
  unsetCurrentTodo,
  setCurrentTodo,
  startFetch,
} = currentTodoSlice.actions;
