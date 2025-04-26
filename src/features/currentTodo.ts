import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface CurrentTodoState {
  currentTodo: Todo | null;
  opened: boolean;
  loadingUser: boolean;
}

const initialState: CurrentTodoState = {
  currentTodo: null,
  opened: false,
  loadingUser: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.currentTodo = action.payload;
    },
    isOpened: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.opened = action.payload;
    },
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loadingUser = action.payload;
    },
  },
});

export const { setCurrentTodo, isOpened, setLoadingUser } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
