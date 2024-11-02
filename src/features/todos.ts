import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, { payload }: PayloadAction<Todo[]>) => payload,
  },
});

export const selectTodos = (state: RootState) => state.todos;

export const { setTodos } = todosSlice.actions;
