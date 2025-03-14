/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = {
  todo: Todo | null;
};

const initialState: State = {
  todo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    openTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
    },
    closeTodo: state => {
      state.todo = null;
    },
  },
});
