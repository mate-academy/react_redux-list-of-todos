import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    SET: (_todos, { payload }: PayloadAction<Todo[]>) => {
      return payload;
    },
  },
});
