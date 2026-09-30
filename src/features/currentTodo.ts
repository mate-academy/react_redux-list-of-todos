import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';
import { getUser } from '../api';

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

export const loadUser = createAsyncThunk('currentTodo/loadUser', (todo: Todo) =>
  getUser(todo.userId),
);

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => ({
      ...state,
      todo: action.payload,
      user: null,
      error: '',
    }),
    clearCurrentTodo: () => initialState,
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => ({
        ...state,
        loading: true,
      }))
      .addCase(loadUser.fulfilled, (state, action) => {
        // ігноруємо застарілу відповідь, якщо вибрали інший todo
        if (state.todo?.id !== action.meta.arg.id) {
          return state;
        }

        return { ...state, loading: false, user: action.payload };
      })
      .addCase(loadUser.rejected, (state, action) => {
        if (state.todo?.id !== action.meta.arg.id) {
          return state;
        }

        return { ...state, loading: false, error: 'Failed to load user details.' };
      });
  },
});

export const currentTodoActions = currentTodoSlice.actions;
