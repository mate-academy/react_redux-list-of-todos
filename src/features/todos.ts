import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    initTodos: (state, action: PayloadAction<Todo[]>) => {
      return Object.assign({}, state, { data: action.payload });
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return Object.assign({}, state, { loading: action.payload });
    },
    setError: (state, action: PayloadAction<string | null>) => {
      return Object.assign({}, state, { error: action.payload });
    },
  },
});

export default todosSlice.reducer;
export const { initTodos, setError, setLoading } = todosSlice.actions;
