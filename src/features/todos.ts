import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set(state: Todo[], action: PayloadAction<Todo[]>): Todo[] {
      return [...action.payload];
    },
  },
});
