import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    select: (state, action: PayloadAction<Todo>) => action.payload,

    cancelSelect: () => null,
  },
});

export const { actions: currentTodoActions, reducer: currentTodoReducer } =
  currentTodoSlice;
