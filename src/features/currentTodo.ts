import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state: Todo | null, action: PayloadAction<Todo>) =>
      action.payload,
    closeModal: (state: Todo | null) => null,
  },
});

export const { setCurrentTodo, closeModal } = currentTodoSlice.actions;
