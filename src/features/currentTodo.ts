import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_: Todo | null, action: PayloadAction<Todo>) =>
      action.payload,
    clearCurrentTodo: () => null,
  },
});
