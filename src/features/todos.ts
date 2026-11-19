import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => action.payload,
    addTodo: (state, action: PayloadAction<Todo>) => [...state, action.payload],
    deleteTodo: (state, action: PayloadAction<number>) =>
      state.filter(todo => todo.id !== action.payload),
  },
});

export const { setTodos, addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
