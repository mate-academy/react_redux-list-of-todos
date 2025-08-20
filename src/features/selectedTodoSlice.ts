/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface SelectedTodoState {
  selectedTodo: Todo | null;
}

const initialState: SelectedTodoState = {
  selectedTodo: null,
};

const { reducer, actions } = createSlice({
  name: 'selectedTodo',
  initialState,
  reducers: {
    setSelectedTodo: (state, action) => {
      state.selectedTodo = action.payload;
    },
    clearSelectedTodo: state => {
      state.selectedTodo = null;
    },
  },
});

export const { setSelectedTodo, clearSelectedTodo } = actions;
export default reducer;
