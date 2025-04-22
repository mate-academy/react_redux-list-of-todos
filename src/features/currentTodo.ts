import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentTodoState = {
  currentTodo: Todo | null;
  loading: boolean;
  error: string;
  user: User | null;
};

const initialState: CurrentTodoState = {
  currentTodo: null,
  loading: false,
  error: '',
  user: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return { ...state, currentTodo: action.payload };
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, user: action.payload };
    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, error: action.payload };
    },
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
