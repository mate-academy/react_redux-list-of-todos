import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, { payload }: PayloadAction<Todo[]>) => [...payload],
  },
});

export const { setTodos } = todosSlice.actions;
