import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo>) => action.payload,
    clearCurrentTodo: () => null,
  },
  selectors: {
    selectCurrentTodo: state => state,
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export const { selectCurrentTodo } = currentTodoSlice.selectors;
