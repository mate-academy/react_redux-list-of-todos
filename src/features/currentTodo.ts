import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodo = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action: PayloadAction<Todo>) {
      return action.payload;
    },
    removeCurrentTodo() {
      return null;
    },
  },
});
export const { setCurrentTodo, removeCurrentTodo } = currentTodo.actions;
export default currentTodo.reducer;
