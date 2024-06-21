/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = { todo: null } as { todo: Todo | null };

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action: PayloadAction<Todo>) {
      state.todo = action.payload;
    },
    deleteCurrentTodo(state) {
      state.todo = null;
    },
  },
});
