import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../../types/Todo';

type CurrentTodo = Todo | null;

const initialState = null as CurrentTodo;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<CurrentTodo>) => action.payload,
    clearCurrentTodo: () => null,
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
