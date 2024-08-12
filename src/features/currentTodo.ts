import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
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

export const currentTodoSlice: Slice<CurrentTodoState> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.error = action.payload;
    },
    loadCurrentTodo: (state, action: PayloadAction<Todo>) => {
      // eslint-disable-next-line no-param-reassign
      state.todo = action.payload;
    },
    loadCurrentUser: (state, action: PayloadAction<User>) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export const { actions } = currentTodoSlice;
