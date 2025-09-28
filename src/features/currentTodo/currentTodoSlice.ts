import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo'; // ← виправлений шлях
import { User } from '../../types/User';

interface CurrentTodoState {
  todo: Todo | null;
  user: User | null;
  isLoading: boolean;
}

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
  isLoading: false,
};

// Async thunk for loading user
export const loadUser = createAsyncThunk(
  'currentTodo/loadUser',
  async (userId: number) => {
    const response = await fetch(
      `https://mate-academy.github.io/react_dynamic-list-of-todos/api/users/${userId}.json`,
    );

    if (!response.ok) {
      throw new Error('Failed to load user');
    }

    return response.json();
  },
);

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return {
        ...state,
        todo: action.payload,
        user: null,
        isLoading: !!action.payload,
      };
    },
    clearCurrentTodo: state => {
      return {
        ...state,
        todo: null,
        user: null,
        isLoading: false,
      };
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadUser.pending, state => {
        return {
          // ← використовуємо return замість мутації
          ...state,
          isLoading: true,
        };
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        return {
          ...state,
          user: action.payload,
          isLoading: false,
        };
      })
      .addCase(loadUser.rejected, state => {
        return {
          ...state,
          isLoading: false,
        };
      });
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
