import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type TodosState = {
  todos: Todo[] | [];
};

const initialState: TodosState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: { payload: Todo[] }) {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
