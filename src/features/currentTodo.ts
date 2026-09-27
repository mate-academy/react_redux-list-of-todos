import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo | null = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState as Todo | null,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
    clearCurrentTodo: () => {
      return null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
