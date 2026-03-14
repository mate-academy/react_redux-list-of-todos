import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const id = action.payload;
      const todo = state.find(t => t.id === id);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
