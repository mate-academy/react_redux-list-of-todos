import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const currentTodo = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo | null>) =>
      action.payload,
  },
});

export const { setCurrentTodo } = currentTodo.actions;
export default currentTodo.reducer;
