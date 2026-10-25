import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState: { items: [], isLoading: false } as TodosState,
  reducers: {
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      return {
        ...state,
        items: action.payload,
      };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
  },
});

export const { loadTodos, setLoading } = todosSlice.actions;
