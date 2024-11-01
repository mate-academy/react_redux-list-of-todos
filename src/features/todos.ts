import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add: (todos, action) => [...todos, ...action.payload],
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
