import { Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice: Slice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    load(state, action) {
      return state.concat(action.payload);
    },
  },
});

export default todosSlice.reducer;
export const { load } = todosSlice.actions;
