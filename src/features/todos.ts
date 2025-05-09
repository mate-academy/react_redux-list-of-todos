import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
