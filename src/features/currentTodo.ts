import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface CurrentTodoState {
  todo: Todo | null;
  isLoadingUser: boolean;
}

const initialState: CurrentTodoState = {
  todo: null,
  isLoadingUser: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return {
        ...state,
        todo: action.payload,
        isLoadingUser: action.payload !== null,
      };
    },
    clearCurrentTodo: () => initialState,
    setLoadingUser: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoadingUser: action.payload,
      };
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo, setLoadingUser } =
  currentTodoSlice.actions;
export default currentTodoSlice.reducer;
