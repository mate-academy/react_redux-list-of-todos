import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',

  initialState: [] as Todo[],

  reducers: {
    setTodos: (__state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
