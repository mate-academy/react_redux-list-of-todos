import { Todo } from './../types/Todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
