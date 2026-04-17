import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { getUser } from '../api';

export const loadUser = createAsyncThunk(
  'currentTodo/loadUser',
  async (userId: number) => {
    return getUser(userId);
  }
);

type CurrentTodoState = {
  todo: Todo | null;
  user: User | null;
  loading: boolean;
};

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
  loading: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
      state.user = null;
      state.loading = true;
    },

    clearCurrentTodo: state => {
      state.todo = null;
      state.user = null;
      state.loading = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    });
  },
});

export const { setCurrentTodo, clearCurrentTodo } =
  currentTodoSlice.actions;

export default currentTodoSlice.reducer;