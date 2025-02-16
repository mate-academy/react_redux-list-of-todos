import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodoState {
  value: Todo[];
}

const initialState: TodoState = {
  value: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodos: (state: TodoState, action: PayloadAction<Todo[]>) => {
      state.value.push(...action.payload);
    },
  },
});

export const { addTodos } = todosSlice.actions;

export default todosSlice.reducer;
