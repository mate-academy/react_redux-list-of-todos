import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(_, action) {
      return action.payload as Todo[];
    },
  },
});

export const { setTodos } = todosSlice.actions;
