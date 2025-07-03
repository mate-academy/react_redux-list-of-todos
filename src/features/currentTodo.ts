import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    setTodo: (_state, action) => {
      return action.payload;
    },
  },
});
