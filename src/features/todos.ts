import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(_todos: Todo[], action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});
