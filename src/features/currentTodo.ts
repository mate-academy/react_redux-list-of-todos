import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodoState = Todo | null;

const initialState: CurrentTodoState = null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState as CurrentTodoState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo | null>) => action.payload,
    clearCurrentTodo: () => null,
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
