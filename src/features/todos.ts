import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(_, action: PayloadAction<Todo[]>) {
      // Замінюємо весь стан
      return action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      return [...state, action.payload];
    },
    removeTodo(state, action: PayloadAction<number>) {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo(state, action: PayloadAction<number>) {
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    },
  },
});

export const { setTodos, addTodo, removeTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;
