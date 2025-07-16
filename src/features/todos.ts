import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      return state.filter(todo => todo.id !== +action.payload);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const updatedTodo = state.find(todo => todo.id === +action.payload);

      if (updatedTodo) {
        updatedTodo.completed = !updatedTodo.completed;
      }
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>,
    ) => {
      const updatedTodo = state.find(todo => todo.id === +action.payload.id);

      if (updatedTodo) {
        updatedTodo.title = action.payload.text;
      }
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    clearCompleted: state => {
      return state.filter(todo => !todo.completed);
    },
  },
});
