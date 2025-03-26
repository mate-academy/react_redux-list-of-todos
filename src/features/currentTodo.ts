import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<Todo | null>) => action.payload,
  },
});
export const { selectTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
