import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { PayloadAction } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
