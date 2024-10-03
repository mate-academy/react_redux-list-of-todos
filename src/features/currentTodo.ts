import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice<Todo | null> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    currentTodoReducer(_: Todo | null, action: PayloadAction<Todo | null>) {
      return action.payload;
    },
  },
});

export const { currentTodoReducer } = currentTodoSlice.actions;
