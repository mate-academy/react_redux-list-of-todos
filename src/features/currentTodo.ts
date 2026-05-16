import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface CurrentTodoState {
  item: Todo | null;
  user: User | null;
  isLoading: boolean;
}

const initialState: CurrentTodoState = {
  item: null,
  user: null,
  isLoading: false,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      return { ...state, item: action.payload };
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      return { ...state, user: action.payload };
    },
    clearCurrentTodo: state => {
      return { ...state, item: null, user: null };
    },
    setCurrentTodoLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const {
  setCurrentTodo,
  setUser,
  clearCurrentTodo,
  setCurrentTodoLoading,
} = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
