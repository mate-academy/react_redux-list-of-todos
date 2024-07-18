import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentTodoState = {
  todo: Todo | null;
  user: User | null;
  loading: boolean;
  error: string;
};

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
  loading: false,
  error: '',
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    loadCurrentTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
    },
    loadCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { actions } = currentTodoSlice;
