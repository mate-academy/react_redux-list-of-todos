import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
type TodosState = Todo[];

const initialState: TodosState = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_state: Todo[], action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
