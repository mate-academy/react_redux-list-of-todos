import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './index';
import { Todo } from '../react-app-env';

interface TodosState {
  todos: Todo[]
}

const initialState: TodosState = {
  todos: [{
    id: 1,
    title: 'TEST',
    userId: 1,
    completed: false,
  }],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export const selectTodo = (state: RootState) => state.todosReducer.todos;
export default todosSlice.reducer;
