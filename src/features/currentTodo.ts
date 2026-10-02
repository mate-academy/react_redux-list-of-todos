import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface CurrentTodoState {
  todo: Todo | null;
}

const initialState: CurrentTodoState = {
  todo: null,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action: PayloadAction<Todo | null>) {
      state.todo = action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
