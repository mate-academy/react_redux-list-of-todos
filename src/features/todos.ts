import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  todos: [] as Todo[],
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setLoadingTodo: (state, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),

    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      todos: action.payload,
      loading: false,
    }),
  },
});

export const { setLoadingTodo, setTodos } = todosSlice.actions;
