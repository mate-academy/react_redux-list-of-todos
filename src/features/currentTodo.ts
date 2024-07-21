import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo>) => action.payload,
    clearCurrentTodo: () => initialState,
  },
});

export const { clearCurrentTodo, setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
