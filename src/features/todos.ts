import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    loadTodos(state, { payload }: PayloadAction<Todo[]>) {
      state.push(...payload);
    },
  },
});
