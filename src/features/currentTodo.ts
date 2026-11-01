import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodos: (_state, action: PayloadAction<Todo>) => action.payload,
    clearCurrentTodos: () => null,
  },
});

export const { setCurrentTodos, clearCurrentTodos } = currentTodoSlice.actions;
