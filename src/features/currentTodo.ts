/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentState = {
  todo: Todo | null;
  user: User | null;
  isOpen: boolean;
  isUserLoading: boolean;
};

const initialState: CurrentState = {
  todo: null,
  user: null,
  isOpen: false,
  isUserLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    openWith: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
      state.user = null;
      state.isOpen = true;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    close: state => {
      state.isOpen = false;
      state.todo = null;
      state.user = null;
      state.isUserLoading = false;
    },
  },
});

export const { openWith, setUserLoading, setUser, close } =
  currentTodoSlice.actions;
