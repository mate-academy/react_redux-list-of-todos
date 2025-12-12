/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface CurrentTodoState {
  selectedTodo: Todo | null;
}

const initialState: CurrentTodoState = {
  selectedTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },
  },
});

export const { setSelectedTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
