import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_: Todo[], action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { actions } = todosSlice;
