import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addTodo(todo, { payload }: PayloadAction<Todo>) {
      return payload;
    },
    clearTodo: () => null,
  },
});
