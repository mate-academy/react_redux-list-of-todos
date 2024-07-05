import { createSlice, PayloadAction, Reducer, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: '',
};

export const todosSlice: Slice<TodosState> = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default todosSlice.reducer as Reducer<TodosState>;
export const { setTodos, setLoading, setError } = todosSlice.actions;
