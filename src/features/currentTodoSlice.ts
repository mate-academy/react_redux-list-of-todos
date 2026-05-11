import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodoState = {
  selectedTodo: Todo | null;
};

const initialState: CurrentTodoState = {
  selectedTodo: null,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setSelectedTodo(state, action: PayloadAction<Todo | null>) {
      return {
        ...state,
        selectedTodo: action.payload,
      };
    },
  },
});

export const { setSelectedTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
