import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    downloadTodos: (todos, action): Todo[] => action.payload,
  },
});

export const { downloadTodos } = todosSlice.actions;
