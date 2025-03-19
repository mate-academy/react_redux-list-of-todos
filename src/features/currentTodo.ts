import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      return action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
