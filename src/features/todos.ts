import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    },
    setLoading(state) {
      return {
        ...state,
        loading: true,
      };
    },
    setError(state, action: PayloadAction<string>) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
  },
});

export const { setTodos, setLoading, setError } = todosSlice.actions;
export default todosSlice.reducer;
