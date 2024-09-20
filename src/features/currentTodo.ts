import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setСurrentTodo: (_, action: PayloadAction<Todo | null>) => action.payload,
    closeСurrentTodo: () => null,
  },
});

export default currentTodoSlice.reducer;
export const { setСurrentTodo, closeСurrentTodo } = currentTodoSlice.actions;
