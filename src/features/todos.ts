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
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
