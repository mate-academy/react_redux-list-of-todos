import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    set: (currentTodo, { payload }: PayloadAction<Todo | null>) => {
      return payload;
    },
    clear: () => null,
  },
});
