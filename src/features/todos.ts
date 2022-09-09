import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodoState {
  todos: Todo[],
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todoSlice.actions;
export default todoSlice.reducer;
