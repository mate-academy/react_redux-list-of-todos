import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action) => action.payload,

    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    addTodo: (state, action) => {
      state.push(action.payload);
    },

    deleteTodo: (state, action) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
