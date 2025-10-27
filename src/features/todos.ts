import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return { ...state, items: action.payload, loading: false };
    },
    startLoading(state) {
      return { ...state, loading: true };
    },
    setError(state, action: PayloadAction<string>) {
      return { ...state, error: action.payload };
    },
    getTodos(state) {
      return state;
    },
  },
});

export const { setTodos, startLoading, setError, getTodos } =
  todosSlice.actions;

export default todosSlice.reducer;
