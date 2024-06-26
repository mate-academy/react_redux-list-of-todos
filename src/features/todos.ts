import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    fetchTodos(state, action: PayloadAction<Todo[]>) {
      state.push(...action.payload);
    },
  },
});

export const { fetchTodos } = todosSlice.actions;

export default todosSlice.reducer;
