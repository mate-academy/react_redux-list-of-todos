import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo(_state, action: PayloadAction<Todo>) {
      return action.payload;
    },
    unselectTodo() {
      return null;
    },
  },
});

export const actions = currentTodoSlice.actions;
