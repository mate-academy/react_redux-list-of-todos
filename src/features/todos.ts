import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
/* eslint-disable no-param-reassign */

const initialState = {
  items: [] as Todo[],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.items = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { setTodos } = todosSlice.actions;
