import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

/* eslint-disable no-param-reassign */
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

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
      if (action.payload) {
        state.user = null;
      }
    },

    setTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
      state.isLoading = false;
    },

    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoading = false;
    },

    clearTodo: state => {
      state.todo = null;
      state.user = null;
      state.isLoading = false;
    },
  },
});

export const { setTodo, setLoading, setUser, clearTodo } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
