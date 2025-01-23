import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => action.payload,
    clearTodos: () => [],
  },
});


export const { setTodos, clearTodos } = todosSlice.actions;
export default todosSlice.reducer;
