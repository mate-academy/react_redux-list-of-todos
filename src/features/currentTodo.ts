import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    add: (_state, actions) => {
      return actions.payload;
    },

    del: () => {
      return null;
    },
  },
});

export const { add, del } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
