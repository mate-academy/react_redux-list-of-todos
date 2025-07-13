import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export type CurrentTodoState = {
  currentTodo: Todo | null;
  currentUser: User | null;
  isLoading: boolean;
};

const initialState: CurrentTodoState = {
  currentTodo: null,
  currentUser: null,
  isLoading: true,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    saveTodo(state, action: PayloadAction<Todo>) {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = action.payload;
    },

    saveUser(state, action: PayloadAction<User>) {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = action.payload;
    },
    clearUser(state) {
      // eslint-disable-next-line no-param-reassign
      state.currentUser = null;
    },

    clearTodo(state) {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = null;
    },

    changeIsLoading(state, action: PayloadAction<boolean>) {
      // eslint-disable-next-line no-param-reassign
      state.isLoading = action.payload;
    },
  },
});

export const { saveTodo, clearTodo, changeIsLoading, saveUser, clearUser } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
