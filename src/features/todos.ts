import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(_state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { setTodos } = todosSlice.actions;
