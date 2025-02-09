import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(_, { payload }: PayloadAction<Todo[]>) {
      return payload;
    },
  },
});