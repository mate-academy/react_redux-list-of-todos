/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
type CurrentState = {
  selectedTodo: Todo | null;
};

const initialState: CurrentState = {
  selectedTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodos: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const { setCurrentTodos } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
