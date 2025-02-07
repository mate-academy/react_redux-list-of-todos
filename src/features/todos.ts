import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return [...state, ...action.payload];
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
