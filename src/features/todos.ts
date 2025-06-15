import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    initialize: (_state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { initialize } = todosSlice.actions;
