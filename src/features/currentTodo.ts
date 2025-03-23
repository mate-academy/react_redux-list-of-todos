import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    deleteTodo: () => {
      return null;
    },
  },
});

export const { setTodo, deleteTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
