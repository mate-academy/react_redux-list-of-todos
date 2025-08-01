import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    addTodos: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    toggleTodos: (state, action: PayloadAction<number>) => {
      const todo = state.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodos: (state, action: PayloadAction<number>) => {
      return state.filter(t => t.id !== action.payload);
    },
  },
});

export const { setTodos, addTodos, toggleTodos, removeTodos } =
  todosSlice.actions;
export default todosSlice.reducer;
