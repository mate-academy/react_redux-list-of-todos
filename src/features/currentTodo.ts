import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodoState = {
  todo: Todo | null;
  isModalActive: boolean;
};

const initialState: CurrentTodoState = {
  todo: null,
  isModalActive: false,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodoSuccess: (
      state: CurrentTodoState,
      action: PayloadAction<Todo>,
    ) => ({
      ...state,
      todo: action.payload,
      isModalActive: true,
    }),
    closeSelectedTodo: (state: CurrentTodoState) => ({
      ...state,
      todo: null,
      isModalActive: false,
    }),
  },
});

export const { selectTodoSuccess, closeSelectedTodo } =
  currentTodoSlice.actions;
export const todosReducer = currentTodoSlice.reducer;
