import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type TodosState = Todo[];

const initialState: TodosState = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action: PayloadAction<Todo>) => {
      return state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo,
      );
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, toggleTodo, updateTodo, deleteTodo } =
  todosSlice.actions;
export default todosSlice.reducer;
