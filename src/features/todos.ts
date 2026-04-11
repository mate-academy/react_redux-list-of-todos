import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
      // eslint-disable-next-line no-param-reassign
      state.loading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, toggleTodo, setLoading } = todosSlice.actions;
export default todosSlice.reducer;
