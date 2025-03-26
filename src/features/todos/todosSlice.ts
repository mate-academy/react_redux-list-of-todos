/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/Todo';

export interface TodosState {
  todos: Todo[];
  selected: Todo | null;
}

const initialState: TodosState = {
  todos: [],
  selected: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    select: (state, action: PayloadAction<Todo>) => {
      state.selected = action.payload;
    },
    clearSelect: state => {
      state.selected = null;
    },
  },
});

export const { setAll, select, clearSelect } = todosSlice.actions;

export default todosSlice.reducer;
