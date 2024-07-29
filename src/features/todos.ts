import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  data: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  data: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    initialTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, data: action.payload };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setError: (state, action: PayloadAction<string | null>) => {
      return { ...state, error: action.payload };
    },
  },
});

export const { initialTodos, setLoading, setError } = todosSlice.actions;
export default todosSlice.reducer;
