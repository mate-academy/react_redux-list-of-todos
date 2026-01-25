import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
  selectors: {
    selectTodos: state => state,
  },
});

export const { setTodos } = todosSlice.actions;
export const { selectTodos } = todosSlice.selectors;
