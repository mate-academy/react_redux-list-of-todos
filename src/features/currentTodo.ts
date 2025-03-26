import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'CurrentTodo',
  initialState,
  reducers: {
    currentTodo: (_, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
  },
});
