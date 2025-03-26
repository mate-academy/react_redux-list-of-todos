import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo(state, action) {
      return action.payload;
    },
    removeTodo() {
      return null;
    },
  },
});

export const { setTodo, removeTodo } = currentTodoSlice.actions;
