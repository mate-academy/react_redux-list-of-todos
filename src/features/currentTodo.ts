import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface CurrentTodoState {
  todo: Todo | null;
  user: User | null;
  isUserLoading: boolean;
}

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
  isUserLoading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
      state.user = null;
      state.isUserLoading = true;
    },
    setTodoUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isUserLoading = false;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
    clearCurrentTodo: state => {
      state.todo = null;
      state.user = null;
      state.isUserLoading = false;
    },
  },
});

export const { selectTodo, setTodoUser, setUserLoading, clearCurrentTodo } =
  currentTodoSlice.actions;
