import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.push(...action.payload);
    },
  },
});

export default todosSlice.reducer;
export const { setTodos } = todosSlice.actions;
