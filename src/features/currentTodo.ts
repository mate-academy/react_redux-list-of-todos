/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentTodo } from '../types/Todo';

export type CurrentTodoState = {
  currentTodo: CurrentTodo | null;
  isLoading: boolean;
};

const initialState: CurrentTodoState = {
  currentTodo: null,
  isLoading: true,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    saveTodo(state, action: PayloadAction<CurrentTodo>) {
      state.currentTodo = action.payload;
    },

    clearTodo(state) {
      state.currentTodo = null;
    },

    changeIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { saveTodo, clearTodo, changeIsLoading } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
