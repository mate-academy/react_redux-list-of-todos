import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(todos, action: PayloadAction<Todo[]>) {
      todos.push(...action.payload);
    },
  },
});

export const { setTodos } = todosSlice.actions;
