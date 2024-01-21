import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/User';
import { Todo } from '../types/Todo';

type CurrentTodoState = {
  modalDisplay: boolean;
  currentTodo: Todo | null;
  currentUser: User | null;
  userLoading: boolean;
  userError: string;
};

const initialState: CurrentTodoState = {
  modalDisplay: false,
  currentTodo: null,
  currentUser: null,
  userLoading: false,
  userError: '',
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    showModal: (state: CurrentTodoState, action: PayloadAction<boolean>) => {
      state.modalDisplay = action.payload;
    },
    setUserLoading: (
      state: CurrentTodoState,
      action: PayloadAction<boolean>,
    ) => {
      state.userLoading = action.payload;
    },
    setUserError: (state: CurrentTodoState, action: PayloadAction<string>) => {
      state.userError = action.payload;
    },
    setCurrentUser: (state: CurrentTodoState, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setCurrenTodo: (state: CurrentTodoState, action: PayloadAction<Todo>) => {
      state.currentTodo = action.payload;
    },
  },
});

export const { actions } = currentTodoSlice;

export default currentTodoSlice.reducer;
