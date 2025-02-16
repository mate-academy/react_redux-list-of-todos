import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.splice(0, state.length, ...action.payload);
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
