import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});

export const { setTodos } = todosSlice.actions;

export default todosSlice.reducer;
