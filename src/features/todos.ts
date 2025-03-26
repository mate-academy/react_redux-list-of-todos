/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = [] as Todo[];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_, action) => {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
