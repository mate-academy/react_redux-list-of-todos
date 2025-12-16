import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Todo | null>) => {
      if (state && state.id === action.payload?.id) {
        return null;
      }

      return action.payload;
    },
  },
});
