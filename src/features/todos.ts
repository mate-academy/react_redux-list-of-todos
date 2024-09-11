import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  data: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  data: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    fetchStart: (state: TodosState) => ({
      ...state,
      loading: true,
      error: null,
    }),
    fetchSuccess: (state: TodosState, action: PayloadAction<Todo[]>) => ({
      ...state,
      data: action.payload,
      loading: false,
    }),
    fetchError: (state: TodosState, action: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
});

export const { fetchStart, fetchSuccess, fetchError } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
