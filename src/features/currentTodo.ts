import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: initialState as Todo | null,
  reducers: {
    set: (state, action: PayloadAction<Todo>) => ({ ...action.payload }),
    clean: () => null,
  },
});
