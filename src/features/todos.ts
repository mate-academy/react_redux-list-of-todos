import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },

    addTodo: (state, action: PayloadAction<Todo>) => {
      state.push(action.payload);
    },
  },
});

export default todosSlice.reducer;
export const { setTodos, addTodo } = todosSlice.actions;
