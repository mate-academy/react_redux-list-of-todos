import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodoState = {
  todo: Todo | null;
  selectedTodoUser: number | null;
};

const initialState: CurrentTodoState = {
  todo: null,
  selectedTodoUser: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (
      state,
      action: PayloadAction<{ todo: Todo; userId: number }>,
    ) => {
      return {
        ...state,
        todo: action.payload.todo,
        selectedTodoUser: action.payload.userId,
      };
    },
    clearCurrentTodo: state => {
      return {
        ...state,
        todo: null,
        selectedTodoUser: null,
      };
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
