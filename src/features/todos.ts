import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(_, action: PayloadAction<Todo[]>) {
      return action.payload;
    },
    toggleCompleted(state, action: PayloadAction<number>) {
      const todo = state.find(t => t.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
});

export const { setTodos, toggleCompleted } = todosSlice.actions;
export default todosSlice.reducer;
