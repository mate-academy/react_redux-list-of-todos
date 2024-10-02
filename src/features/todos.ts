import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos(todos, action: PayloadAction<Todo[]>) {
      todos.push(...action.payload);
    },
  },
});

export const { addTodos } = todosSlice.actions;
