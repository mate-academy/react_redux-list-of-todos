import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

//import { Status } from '../types/Status';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
};

/* eslint-disable no-param-reassign */
const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      // ✅ Direct mutation
      state.loading = action.payload;
    },
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.todos = action.payload;
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.todos.push(action.payload);
    },
  },
});

export const { setLoading, setTodos, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
