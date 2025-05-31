import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    loadTodos(_state, { payload }: PayloadAction<Todo[]>) {
      // eslint-disable-next-line no-param-reassign
      return payload;
    },
  },
});
