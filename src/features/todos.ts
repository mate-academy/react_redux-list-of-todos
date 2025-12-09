import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
    setTodosLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setTodos, setTodosLoading } = todosSlice.actions;
