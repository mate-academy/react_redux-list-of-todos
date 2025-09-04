import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface SelectedTodoState {
  selectedTodo: Todo | null;
}

const initialState: SelectedTodoState = {
  selectedTodo: null,
};

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
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
