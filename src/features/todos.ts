import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (todos, { payload }: PayloadAction<Todo>) => {
      todos.push(payload);
    },
    removeTodo: (todos, { payload }: PayloadAction<Todo>) => {
      return todos.filter(todo => todo.id !== payload.id);
    },
    setTodos: (_, { payload }: PayloadAction<Todo[]>) => {
      return payload;
    },
  },
});
