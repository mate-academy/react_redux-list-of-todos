import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    SET: (_currentTodo, { payload }: PayloadAction<Todo>) => {
      return payload;
    },
    REMOVE: () => {
      return null;
    },
  },
});
