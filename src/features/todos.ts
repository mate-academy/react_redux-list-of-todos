import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    set: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

export const { set: setTodos } = todosSlice.actions;

export default todosSlice.reducer;
