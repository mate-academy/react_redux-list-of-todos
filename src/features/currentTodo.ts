import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    viewTodo: (_todos, action) => action.payload,
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
