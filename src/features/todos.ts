// src/features/todos.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => {
      // Повертаємо весь масив цілком
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
