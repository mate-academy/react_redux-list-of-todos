/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface SelectedPostState {
  currentTodo: Todo | null;
}

const initialState: SelectedPostState = {
  currentTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      state.currentTodo = action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
