import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    selectTodo: (_state, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
  },
});

export default currentTodoSlice.reducer;
export const { selectTodo } = currentTodoSlice.actions;
