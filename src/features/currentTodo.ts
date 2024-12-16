import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_state, action: PayloadAction<Todo | null>) => {
      return action.payload;
    },
    clearTodo: () => null,
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
