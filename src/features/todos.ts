/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  todos: Todo[];
  shownTodos: Todo[];
};

const initialState: TodosState = {
  todos: [],
  shownTodos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    setShownTodos: (state, action: PayloadAction<Todo[]>) => {
      state.shownTodos = action.payload;
    },
  },
});

export const { setTodos, setShownTodos } = todosSlice.actions;
