import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface CurrentTodo {
  currentTodo: Todo | null;
  user: User | null;
  loading: boolean;
}

const initialState: CurrentTodo = {
  currentTodo: null,
  user: null,
  loading: false,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    fetchCurrentStart(state) {
      const theState = state;

      theState.loading = true;
      theState.currentTodo = null;
      theState.user = null;
    },
    fetchCurrentSuccess(
      state,
      action: PayloadAction<{ todo: Todo; user: User }>,
    ) {
      const theState = state;

      theState.loading = false;
      theState.currentTodo = action.payload.todo;
      theState.user = action.payload.user;
    },
    fetchCurrentFailure(state) {
      const theState = state;

      theState.loading = false;
    },
    clearCurrent(state) {
      const theState = state;

      theState.currentTodo = null;
      theState.user = null;
    },
  },
});

export const {
  fetchCurrentStart,
  fetchCurrentSuccess,
  fetchCurrentFailure,
  clearCurrent,
} = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
