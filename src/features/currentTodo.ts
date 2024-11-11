import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(_, action: PayloadAction<Todo | null>) {
      return action.payload;
    },
    updateCurrentTodo(state, action: PayloadAction<Todo>) {
      if (state) {
        return { ...state, ...action.payload };
      }

      return state;
    },
    clearCurrentTodo() {
      return null;
    },
  },
});

export const { setCurrentTodo, updateCurrentTodo, clearCurrentTodo } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
