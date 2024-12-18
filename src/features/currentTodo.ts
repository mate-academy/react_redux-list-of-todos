/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { getUser } from '../api';
import { User } from '../types/User';

export const getCurrentUser = createAsyncThunk(
  'currentTodo/fetch',
  async (userId: number) => getUser(userId),
);

type CurrentTodo = {
  todo: Todo | null;
  loading: boolean;
  error: string;
  user: User | null;
};

const initialState: CurrentTodo = {
  todo: null,
  loading: false,
  error: '',
  user: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrent: (state, action: PayloadAction<Todo | null>) => {
      state.todo = action.payload;
    },
    clearCurrent: state => {
      state.todo = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(getCurrentUser.pending, state => {
      state.error = '';
      state.loading = true;
    });

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });

    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.error = action.error.message || '';
      state.loading = false;
    });
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
