import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
    clearCurrentTodo: () => {
      return null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export const selectCurrentTodo = (state: RootState) => state.currentTodo;
