import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// const initialState = {
//   todos: [] as Todo[],
// };

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(todos, action: PayloadAction<Todo[]>) {
      todos.push(...action.payload);
    },
  },
});

export const { setTodos } = todosSlice.actions;
