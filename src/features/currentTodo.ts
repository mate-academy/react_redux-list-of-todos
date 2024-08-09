import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo | undefined>) => {
      return action.payload;
    },
    deleteCurrentTodo: () => {
      return null;
    },
  },
});

export const { setCurrentTodo, deleteCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
