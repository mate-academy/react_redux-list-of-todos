import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },

    removeTodo: (state, action: PayloadAction<Todo>) => {
      return state.filter(todo => todo.id !== action.payload.id);
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addTodo, removeTodo, updateTodo } = todosSlice.actions;

export default todosSlice.reducer;
