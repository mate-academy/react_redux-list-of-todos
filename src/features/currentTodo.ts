import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodo = Todo | null;

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action: PayloadAction<CurrentTodo>) {
      return action.payload;
    },
    clearCurrentTodo() {
      return null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
