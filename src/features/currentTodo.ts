import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set: (_state, action: { payload: Todo }) => {
      return action.payload;
    },
    clear: () => {
      return null;
    },
  },
});

export default currentTodoSlice.reducer;
export const currentTodoActions = currentTodoSlice.actions;
