import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    closeCurrentTodo: () => {
      return null;
    },
  },
});
