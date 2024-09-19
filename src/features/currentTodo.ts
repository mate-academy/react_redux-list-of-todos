import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice: Slice<Todo | null> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      if (state) {
        return state.id === action.payload.id ? null : action.payload;
      }

      return action.payload;
    },
    deleteCurrentTodo: () => {
      return null;
    },
  },
});

export const actions = currentTodoSlice.actions;
