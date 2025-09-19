import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    // Replace the todo list with the fetched payload
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    toggleCompleted: (state, action: PayloadAction<number>) => {
      const todoId = action.payload;
      const todoToToggle = state.find(t => t.id === todoId);

      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
  },
});
