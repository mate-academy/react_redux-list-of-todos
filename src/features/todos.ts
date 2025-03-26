import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart(state) {
      const theState = state;

      theState.loading = true;
      theState.error = null;
    },
    fetchTodosSuccess(state, action: PayloadAction<Todo[]>) {
      const theState = state;

      theState.todos = action.payload;
      theState.loading = false;
      theState.error = null;
    },
    fetchTodosFailure(state, action: PayloadAction<string>) {
      const theState = state;

      theState.loading = false;
      theState.error = action.payload;
    },
  },
});

export const { fetchTodosStart, fetchTodosSuccess, fetchTodosFailure } =
  todosSlice.actions;

export default todosSlice.reducer;
