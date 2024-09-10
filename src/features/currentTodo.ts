import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo: (_, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
  },
});

export const { setSelectedTodo } = currentTodoSlice.actions;
