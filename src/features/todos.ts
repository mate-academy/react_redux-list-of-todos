import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(_: Todo[], action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});
export const { setTodos } = todosSlice.actions;
