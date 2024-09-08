import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {
  currentTodo: null as Todo | null,
};

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action) => {
      return {
        ...state,
        currentTodo: action.payload,
      };
    },
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
