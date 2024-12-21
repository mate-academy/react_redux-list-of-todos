import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    storeTodos: (todos: Todo[], { payload }: PayloadAction<Todo[]>) => [
      ...todos,...payload,
    ],
  },
});
