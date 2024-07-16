import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type InitialStateType = {
  todo: Todo;
  user: User;
} | null;

const initialState = {
  item: null as InitialStateType,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    getCurrentTodo: (state, action: PayloadAction<InitialStateType>) => {
      state.item = action.payload;
    },
    clearCurrentTodo: state => {
      state.item = null;
    },
  },
});

export const { getCurrentTodo } = currentTodoSlice.actions;
