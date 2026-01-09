import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
    setLoading: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isLoading: action.payload,
    }),
    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      items: action.payload,
      isLoading: false,
    }),
    addTodo: (state, action: PayloadAction<Todo>) => ({
      ...state,
      items: [...state.items, action.payload],
    }),
  },
});

export const { setLoading, setTodos, addTodo } = todosSlice.actions;
