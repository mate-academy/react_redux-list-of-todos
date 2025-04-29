import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(__, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
  },
});

export const { setTodos } = todos.actions;
export const todosReducer = todos.reducer;
