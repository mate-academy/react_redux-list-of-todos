/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add: (state, action: PayloadAction<Todo[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { add } = todosSlice.actions;
export default todosSlice.reducer;
