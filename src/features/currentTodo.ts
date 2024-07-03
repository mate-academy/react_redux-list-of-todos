import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodo = Todo | null;

const initialState = null as CurrentTodo;

export const currentTodoSlice: Slice<CurrentTodo> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    changeTodo(_, action: PayloadAction<Todo>) {
      return action.payload;
    },
    resetTodo() {
      return null;
    },
  },
});

export const { changeTodo, resetTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
