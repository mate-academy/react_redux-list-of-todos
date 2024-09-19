import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => [
      ...state,
      ...action.payload,
    ],
  },
});

export const actions = todosSlice.actions;
