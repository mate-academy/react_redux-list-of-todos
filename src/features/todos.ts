import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (_state, action: { payload: Todo[] }) => {
      return action.payload;
    },
  },
});

export const todosActions = todosSlice.actions;

export default todosSlice.reducer;
