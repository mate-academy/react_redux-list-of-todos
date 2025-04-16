import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialValue = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: {
    value: initialValue,
  },
  reducers: {
    setCurrentTodo: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },

    clearCurrentTodo: state => {
      // eslint-disable-next-line no-param-reassign
      state.value = null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
