import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = { todo: null as Todo | null };

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return { ...state, todo: action.payload };
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
