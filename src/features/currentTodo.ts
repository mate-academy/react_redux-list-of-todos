import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  value: null as Todo | null,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (state, action: PayloadAction<Todo>) => {
      return { ...state, value: action.payload };
    },
    removeSelectedTodo: state => {
      return { ...state, value: null, user: null };
    },
  },
});

export const { selectTodo, removeSelectedTodo } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
