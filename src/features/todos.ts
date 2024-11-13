import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

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

export const selectTodos = (state: RootState) => state.todos;
