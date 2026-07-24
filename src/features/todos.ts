import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodos: (todos: Todo[], action: PayloadAction<Todo[]>) => {
      return [...todos, ...action.payload];
    },
    removeTodos: (todos: Todo[], action: PayloadAction<Todo>) => {
      return [...todos].filter(todo => todo.id !== action.payload.id);
    },
    updateTodos: (todos: Todo[], action: PayloadAction<Todo>) => {
      const updateTodos = [...todos].map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );

      return updateTodos;
    },
    clearTodos: () => [],
  },
});
