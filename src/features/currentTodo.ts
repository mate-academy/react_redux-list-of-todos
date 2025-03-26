import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, { payload }: PayloadAction<Todo>) => payload,
    resetCurrentTodo: () => null,
  },
});

export const { setCurrentTodo, resetCurrentTodo } = currentTodoSlice.actions;

export const selectCurrentTodo = (state: RootState) => state.currentTodo;
