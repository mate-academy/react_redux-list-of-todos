import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface SetTodosPayload {
  todos: Todo[];
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<SetTodosPayload>) => {
      const {
        payload: { todos },
      } = action;

      return todos;
    },
  },
});

const {
  actions: { setTodos },
} = todosSlice;

export { setTodos };
