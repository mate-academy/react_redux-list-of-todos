import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodo: (state, action) => {
      state.push(...action.payload);
    },
  },
});

export const { setTodo } = todosSlice.actions;

export default todosSlice.reducer;
