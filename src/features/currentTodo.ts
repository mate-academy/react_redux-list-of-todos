import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice<Todo | null> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_currentTodo, action: PayloadAction<Todo>) => {
      return action.payload;
    },

    removeTodo: () => null,
  },
});
