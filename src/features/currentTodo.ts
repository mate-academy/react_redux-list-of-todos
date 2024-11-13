import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_, { payload }: PayloadAction<Todo | null>) => payload,
    clearTodo: () => initialState,
  },
});

export const { setTodo, clearTodo } = currentTodoSlice.actions;

export const selectCurrentTodos = (state: RootState) => state.currentTodo;
