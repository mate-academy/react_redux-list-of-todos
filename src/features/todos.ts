import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(todos, { payload }: PayloadAction<Todo[]>) {
      todos.push(...payload);
    },
  },
});
