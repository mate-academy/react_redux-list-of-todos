import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

const initialState = {
  currentTodo: null as Todo | null,
  user: null as User | null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action: PayloadAction<Todo>) {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = action.payload;
    },
    resetCurrentTodo() {
      return initialState;
    },
    setUser(state, action: PayloadAction<User>) {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export const { setCurrentTodo, resetCurrentTodo, setUser } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
