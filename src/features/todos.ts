import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    listTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});

export const { listTodos } = todosSlice.actions;
export default todosSlice.reducer;
