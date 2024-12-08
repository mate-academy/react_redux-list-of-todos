import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    loadTodos: (todos: Todo[], { payload }: PayloadAction<Todo[]>) => {
      todos.push(...payload);
    },
  },
});

export const { loadTodos } = todosSlice.actions;
