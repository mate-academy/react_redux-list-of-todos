import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    newTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

export const { actions } = todosSlice;
