import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set(_, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});

export const { set } = todosSlice.actions;

export default todosSlice.reducer;
