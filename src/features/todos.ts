/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.length = 0;
      state.push(...action.payload);
    },
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
