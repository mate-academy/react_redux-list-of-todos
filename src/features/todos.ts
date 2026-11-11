import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

/* eslint-disable no-param-reassign */
interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },

    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload.id);
    },

    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.items.findIndex(
        todo => todo.id === action.payload.id,
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const { setTodos, addTodo, deleteTodo, updateTodo, setLoading } =
  todosSlice.actions;

export default todosSlice.reducer;
