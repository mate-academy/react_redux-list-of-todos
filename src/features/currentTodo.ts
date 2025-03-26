import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo | null>) => {
      const { payload } = action;

      return payload;
    },
  },
});

const { setCurrentTodo } = currentTodoSlice.actions;

export { setCurrentTodo };
