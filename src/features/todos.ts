import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodos(state, action: PayloadAction<Todo[]>) {
      return {
        ...state,
        items: action.payload,
      };
    },
  },
});

export const { loadTodos } = todosSlice.actions;
export default todosSlice.reducer;
