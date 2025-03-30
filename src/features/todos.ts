import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos: (state: Todo[], { payload }) => [...state, ...payload],
  },
});
