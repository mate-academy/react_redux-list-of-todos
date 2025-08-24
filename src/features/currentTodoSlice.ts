import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Todo } from './todosSlice';

interface CurrentTodoState {
  selected: Todo | null;
}

const initialState: CurrentTodoState = {
  selected: null,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.selected = action.payload;
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
