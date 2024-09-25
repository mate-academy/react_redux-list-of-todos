/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const initialState = {
  todos: [] as Todo[],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
export const selectTodos = (state: RootState) => state.todos.todos;
