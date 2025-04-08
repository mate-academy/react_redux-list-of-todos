import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => action.payload,
    addTodo: (state, action: PayloadAction<Todo>) => [...state, action.payload],
    deleteTodo: (state, action: PayloadAction<number>) =>
      state.filter(todo => todo.id !== action.payload),
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);

      if (index === -1) {
        return state;
      }

      return [
        ...state.slice(0, index),
        action.payload,
        ...state.slice(index + 1),
      ];
    },
  },
});

export const { setTodos, addTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
