/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type TodoState = {
  currentTodo: Todo | null;
  user: User | null,
  loading: boolean;
  error: string;
};

const initialState: TodoState = {
  currentTodo: null,
  user: null,
  loading: false,
  error: '',
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.currentTodo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    removeTodo: (state) => {
      state.currentTodo = null;
      state.user = null;
      state.error = '';
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default currentTodoSlice.reducer;
export const {
  addTodo, removeTodo, addUser, setLoading, setError,
} = currentTodoSlice.actions;
