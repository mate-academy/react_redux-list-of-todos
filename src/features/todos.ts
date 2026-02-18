import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action: PayloadAction<Todo[]>) {
      return action.payload; // повертаємо масив напряму
    },
    addTodo(state, action: PayloadAction<Todo>) {
      state.push(action.payload); // додаємо нового todo
    },
    removeTodo(state, action: PayloadAction<number>) {
      return state.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodos, addTodo, removeTodo } = todosSlice.actions;
export default todosSlice.reducer;
