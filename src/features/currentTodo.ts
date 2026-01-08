/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentTodoState = {
  todo: Todo | null;
  user: User | null;
  isOpen: boolean;
  isLoading: boolean;
};

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
  isOpen: false,
  isLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
      state.user = null;
      state.isOpen = true;
    },

    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    setClose: state => {
      state.isOpen = false;
      state.todo = null;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setOpen, setUserLoading, setUser, setClose } =
  currentTodoSlice.actions;
