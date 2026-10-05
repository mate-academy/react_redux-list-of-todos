import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo | null>) => action.payload,
  },
});

export const setCurrentTodo = currentTodoSlice.actions.setCurrentTodo;
