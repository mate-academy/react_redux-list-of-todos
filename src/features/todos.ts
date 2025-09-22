import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find(t => t.id === +action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});
