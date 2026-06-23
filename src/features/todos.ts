import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

export const { set } = todosSlice.actions;
