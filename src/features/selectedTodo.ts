import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type SelectedTodoState = {
  user: User | null;
  todo: Todo | null;
  loadingSelectedTodo: boolean;
  error: string;
};

const initialState: SelectedTodoState = {
  user: null,
  todo: null,
  loadingSelectedTodo: false,
  error: '',
};

export const selectedTodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoadingTodo(state, action: PayloadAction<boolean>) {
      /* eslint-disable no-param-reassign */
      state.loadingSelectedTodo = action.payload;
    },

    setError(state, action: PayloadAction<string>) {
      /* eslint-disable no-param-reassign */
      state.error = action.payload;
    },
    setTodo(state, action: PayloadAction<Todo | null>) {
      /* eslint-disable no-param-reassign */
      state.todo = action.payload;
    },
    setUser(state, action: PayloadAction<User | null>) {
      /* eslint-disable no-param-reassign */
      state.user = action.payload;
    },
  },
});

export default selectedTodoSlice.reducer;
export const { setLoadingTodo, setError, setTodo, setUser } =
  selectedTodoSlice.actions;
