import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type InitialState = {
  selectedTodo: Todo | null,
};

const initialState: InitialState = {
  selectedTodo: null,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action: PayloadAction<Todo>) => {
      return { ...state, selectedTodo: action.payload };
    },
  },
});

export default currentTodoSlice.reducer;
export const { setSelectedTodo } = currentTodoSlice.actions;