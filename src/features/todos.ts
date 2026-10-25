import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action) => {
      state.push(action.payload);
    },
    removeTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      return state.map(todo =>
        todo.id === action.payload.id ? { ...todo, ...action.payload } : todo,
      );
    },
    setTodos: (_state, action) => {
      return action.payload;
    },
  },
});

export const { addTodo, removeTodo, updateTodo, setTodos } = todosSlice.actions;
