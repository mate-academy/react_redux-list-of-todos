/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  items: [] as Todo[],
  isLoading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(
        todo => todo.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todoItem = state.items.find(todo => todo.id === action.payload);

      if (todoItem) {
        todoItem.completed = !todoItem.completed;
      }
    },
  },
});

export const {
  setTodos,
  setLoading,
  addTodo,
  updateTodo,
  deleteTodo,
  toggleTodo,
} = todosSlice.actions;
