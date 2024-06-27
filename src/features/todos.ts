import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    fill: (todos: Todo[], action: PayloadAction<Todo[]>) => [
      ...todos,
      ...action.payload,
    ],
  },
});
