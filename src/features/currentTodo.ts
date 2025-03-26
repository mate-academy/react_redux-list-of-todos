import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    select(_currentTodo, { payload }: PayloadAction<Todo | null>) {
      return payload;
    },
    remove() {
      return null;
    },
  },
});
