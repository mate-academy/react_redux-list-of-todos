import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  data: Todo[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  data: [],
  isLoading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    todosFetchStart: (state: TodosState) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    todosFetchSuccess: (state: TodosState, action: PayloadAction<Todo[]>) => ({
      ...state,
      data: action.payload,
      isLoading: false,
    }),
    todosFetchError: (state: TodosState, action: PayloadAction<string>) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export const { todosFetchStart, todosFetchSuccess, todosFetchError } =
  todosSlice.actions;
export const todosReducer = todosSlice.reducer;
