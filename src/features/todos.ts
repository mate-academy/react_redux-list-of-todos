import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { addTodos } = todosSlice.actions;
