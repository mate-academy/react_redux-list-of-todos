import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
