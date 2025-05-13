import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload);
    },
    toggleTodoStatus(state, action: PayloadAction<number>) {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const todo = state.find(todo => todo.id === action.payload);

      if (todo) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodoStatus } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
