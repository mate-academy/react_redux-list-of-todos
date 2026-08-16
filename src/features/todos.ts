import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setListOfTodos(state, action) {
      return action.payload;
    },
  },
});

export const { setListOfTodos } = todosSlice.actions;

export default todosSlice.reducer;
