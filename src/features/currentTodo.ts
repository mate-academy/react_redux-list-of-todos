import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    clearCurrentTodo: () => {
      return null;
    },
  },
});

export default currentTodoSlice;
export const { actions } = currentTodoSlice;
