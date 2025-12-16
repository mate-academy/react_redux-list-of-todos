import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (_state, action) => {
      return action.payload;
    },
    add: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
  },
});
