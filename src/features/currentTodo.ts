import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    clearCurrentTodo: () => null,
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice;
