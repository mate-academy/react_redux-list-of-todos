import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(_todo: Todo | null, action: PayloadAction<Todo | null>) {
      return action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
