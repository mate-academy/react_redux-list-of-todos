import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      return action.payload;
    },

    delete: () => {
      return null;
    },
  },
});

export const currentTodoActions = currentTodoSlice.actions;
