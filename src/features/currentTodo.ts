import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (currentTodo: Todo | null, action: PayloadAction<Todo>) => {
      if (currentTodo === action.payload) {
        return null;
      }

      return action.payload;
    },
    removeSelectedTodo: () => null,
  },
});
