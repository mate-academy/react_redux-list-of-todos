import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos(state, action: PayloadAction<Todo[]>) {
      state.push(...action.payload);
    },
  },
});

export const { addTodos } = todosSlice.actions;

export default todosSlice.reducer;
