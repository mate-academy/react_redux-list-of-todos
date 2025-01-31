import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    saveTodos: (state: Todo[], action: PayloadAction<Todo[]>) => {
      return [...state, ...action.payload];
    },
  },
});
