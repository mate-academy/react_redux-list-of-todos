import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  items: Todo[];
  isLoading: boolean;
};

const initialState: TodosState = {
  items: [],
  isLoading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      items: action.payload,
      isLoading: false,
    }),

    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

export const { setTodos, setLoading } = todosSlice.actions;
