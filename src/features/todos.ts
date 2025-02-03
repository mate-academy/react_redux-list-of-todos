import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return [...action.payload];
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      return [...state, action.payload];
    },
    toggleSelectTodo: (state, action: PayloadAction<number>) => {
      return state.map(todo =>
        todo.id === action.payload
          ? {
            ...todo,
            selectedTodo:
                todo.selectedTodo !== undefined ? !todo.selectedTodo : true,
          }
          : todo,
      );
    },
  },
});

export const { setTodos, addTodo, toggleSelectTodo } = todosSlice.actions;

export default todosSlice.reducer;
