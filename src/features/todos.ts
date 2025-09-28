import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, { payload }: PayloadAction<Todo[]>) => payload,
    removeTodosByIds(todos, { payload }: PayloadAction<number[]>) {
      return todos.filter(t => !payload.includes(t.id));
    },
    clearTodos: () => [],
  },
});
