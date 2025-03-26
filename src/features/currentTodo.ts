import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

// const initialState = null as Todo | null;
type CurrentTodoState = {
  currentTodo: Todo | null;
  isLoadingTodo: boolean;
};

const initialState: CurrentTodoState = {
  currentTodo: null,
  isLoadingTodo: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      return {
        ...state,
        currentTodo: action.payload,
      };
    },
    setIsLoadingTodo: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLoadingTodo: action.payload,
      };
    },
  },
});

export const { setCurrentTodo, setIsLoadingTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
