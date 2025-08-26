import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      return state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    clearTodos: () => {
      return [];
    },
  },
});

export const {
  addTodo,
  removeTodo,
  toggleTodo,
  updateTodo,
  setTodos,
  clearTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
