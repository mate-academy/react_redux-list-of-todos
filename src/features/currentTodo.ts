import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (_, action) => action.payload,
    remove: () => null,
  },
});

export const { reducer: currentTodoReducer, actions: currentTodoActions } =
  currentTodoSlice;
