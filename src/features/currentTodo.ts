import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo(_, action: PayloadAction<Todo | null>) {
      return action.payload;
    },
  },
});

export const { setTodo } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
