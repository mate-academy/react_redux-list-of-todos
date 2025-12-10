/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface CurrentTodoState {
  currentTodo: Todo | null;
  currentUser: User | null;
}

const initialState: CurrentTodoState = {
  currentTodo: null,
  currentUser: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      state.currentTodo = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser, setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
