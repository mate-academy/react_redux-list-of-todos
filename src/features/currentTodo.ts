/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface CurrentTodoState {
  currentTodo: Todo | null;
  user: User | null;
  isLoading: boolean;
}
const initialState: CurrentTodoState = {
  currentTodo: null,
  user: null,
  isLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.currentTodo = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export default currentTodoSlice.reducer;
export const { setTodo, setUser, setLoading } = currentTodoSlice.actions;
