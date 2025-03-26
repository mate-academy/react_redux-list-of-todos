import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action) => {
      return action.payload;
    },
    deleteCurrentTodo: () => null,
  },
});

export default currentTodoSlice.reducer;

export const { actions } = currentTodoSlice;
