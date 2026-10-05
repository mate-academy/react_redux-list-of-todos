import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  items: [] as Todo[],
};

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.items = action.payload;
    },
  },
});

export default todoSlice.reducer;
export const { setTodos } = todoSlice.actions;
