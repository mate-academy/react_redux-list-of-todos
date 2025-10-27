import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action: PayloadAction<Todo | null>) {
      return action.payload;
    },
    clearCurrentTodo() {
      return null;
    },
    getCurrentTodo(state) {
      if (initialState || state) {
        return state;
      }
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo, getCurrentTodo } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
