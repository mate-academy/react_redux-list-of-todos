import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type CurrentTodoState = Todo | null;

const initialState: CurrentTodoState = null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState as CurrentTodoState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    clearCurrentTodo: (): CurrentTodoState => {
      return null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
