/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  todos: [] as Todo[],
  isLoading: false,
  isError: false,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: [...state.todos, ...action.payload] };
    },
  },
});

export const { addTodos } = todosSlice.actions;

export default todosSlice.reducer;
