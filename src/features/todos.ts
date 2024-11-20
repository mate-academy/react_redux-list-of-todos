/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  todos: [] as Todo[],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
