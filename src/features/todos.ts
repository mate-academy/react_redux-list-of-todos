import { PayloadAction, createSlice, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[] | []> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_todos, { payload }: PayloadAction<Todo[]>) => payload,
  },
});
