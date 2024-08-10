import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types';

type CurrentTodoState = Todo | null;

const initialState: CurrentTodoState = null;

export const currentTodoSlice: Slice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction) => {
      return action.payload;
    },
    removeCurrentTodo: () => {
      return null;
    },
  },
});
