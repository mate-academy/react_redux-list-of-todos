import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_state, action) => action.payload,
    clearTodo: () => null,
  },
});

export const { setTodo, clearTodo } = currentTodoSlice.actions;
