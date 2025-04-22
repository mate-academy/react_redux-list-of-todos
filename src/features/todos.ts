import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  loading: boolean;
  error: string;
};

const initialState: TodosState = {
  todos: [],
  loading: false,
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, error: action.payload };
    },
  },
});

export default todosSlice.reducer;
export const { actions } = todosSlice;
