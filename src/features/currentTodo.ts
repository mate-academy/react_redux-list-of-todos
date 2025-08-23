import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentTodoState = {
  selectedTodo: Todo | null;
  user: User | null;
  userLoading: boolean;
};

const initialState: CurrentTodoState = {
  selectedTodo: null,
  user: null,
  userLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    todoSelected: (state, action: PayloadAction<Todo | null>) => {
      state.selectedTodo = action.payload;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },

    userLoading: (state, action: PayloadAction<boolean>) => {
      state.userLoading = action.payload;
    },

    clearCurrentTodo: (state) => {
      state.selectedTodo = null;
      state.user = null;
      state.userLoading = false;
    },
  },
});

export const { todoSelected, setUser, userLoading, clearCurrentTodo } = currentTodoSlice.actions;
