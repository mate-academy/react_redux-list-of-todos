import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  items: Todo[];
};

const initialState: TodosState = {
  items: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return {
        ...state,
        items: action.payload,
      };
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.items.push(action.payload);
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.items.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      return {
        ...state,
        items: state.items.filter(t => t.id !== action.payload),
      };
    },
  },
});

export const { setTodos, addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
