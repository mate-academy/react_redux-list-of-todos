import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = {} as Todo;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (_state, action) => {
      if (action.payload) {
        return action.payload;
      } else {
        return {} as Todo;
      }
    },
  },
});

export default currentTodoSlice.reducer;
export const { setTodo } = currentTodoSlice.actions;
