import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodoList(_, { payload }: PayloadAction<Todo[]>) {
      return payload;
    },
  },
});

export const { setTodoList } = todosSlice.actions;
