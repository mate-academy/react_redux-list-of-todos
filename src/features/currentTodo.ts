import { Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    loadTodo: (_state, action) => action.payload,
    clearTodo: () => null,
  },
});

export const { loadTodo, clearTodo } = currentTodoSlice.actions;
