import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (todos: Todo[], { payload }: PayloadAction<Todo[]>) => [
      ...todos,
      ...payload,
    ],
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
