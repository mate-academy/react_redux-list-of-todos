import { PayloadAction, createSlice } from '@reduxjs/toolkit/react';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, { payload }: PayloadAction<Todo | null>) => payload,
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
