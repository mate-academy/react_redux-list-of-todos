import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos(todos, { payload }: PayloadAction<Todo[]>) {
      return [...todos, ...payload];
    },
  },
});
