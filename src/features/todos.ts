import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add: (state, action: PayloadAction<Todo[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export default todosSlice.reducer;

export const { actions } = todosSlice;
