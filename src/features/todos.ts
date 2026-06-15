import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add: (todos, action: PayloadAction<Todo>) => [...todos, action.payload],
    take: (todos, action: PayloadAction<number>) =>
      todos.filter(todo => todo.id !== action.payload),
    clear: () => [],
  },
});

export const { actions } = todosSlice;
