import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice: Slice<Todo[]> = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
    clearTodos: () => [],
  },
});

export const { setTodos, clearTodos } = todosSlice.actions;
