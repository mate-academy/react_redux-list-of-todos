/* eslint-disable @typescript-eslint/default-param-last */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    todosReducer(state, action) {
      return action.payload ? [...state, action.payload] : state;
    },
  },
});

export const { todosReducer } = todosSlice.actions;
