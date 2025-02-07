import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    updateTodos: (_, action: PayloadAction<Todo[]>) => action.payload,
    clearTodos: () => [],
  },
});
