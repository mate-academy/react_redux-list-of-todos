import { createSlice, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add(state, { payload }) {
      payload.forEach((todo: Todo) => state.push(todo));
    },
  },
});
