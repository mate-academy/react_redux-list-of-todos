import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (
      _currentTodo: Todo | null,
      { payload }: PayloadAction<Todo>,
    ) => {
      return payload;
    },
    clearTodo: () => {
      return null;
    },
  },
});

export const { selectTodo, clearTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
