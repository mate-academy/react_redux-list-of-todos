import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';

type TodosState = {
  items: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchTodosStart: state => ({
      ...state,
      loading: true,
      error: null,
    }),

    fetchTodosSuccess: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      items: action.payload,
      loading: false,
    }),

    fetchTodosError: (state, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { fetchTodosStart, fetchTodosSuccess, fetchTodosError } =
  todosSlice.actions;

export default todosSlice.reducer;
