import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
/* eslint-disable no-param-reassign */

type TodosState = {
  items: Todo[];
  selectedTodoId: number | null;
};

const initialState: TodosState = {
  items: [],
  selectedTodoId: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      state.items = action.payload;
    },
    selectTodo(state, action: PayloadAction<number>) {
      state.selectedTodoId = action.payload;
    },
    clearSelectedTodo(state) {
      state.selectedTodoId = null;
    },
  },
});

export const todosActions = todosSlice.actions;
export default todosSlice.reducer;
