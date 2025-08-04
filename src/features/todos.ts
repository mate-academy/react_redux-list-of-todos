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
    // inne operacje jak toggle, remove, add możesz dodać później
  },
});

export const { setTodos } = todosSlice.actions;
