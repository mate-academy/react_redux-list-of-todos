import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: { payload: Todo[] }) => action.payload,
  },
});

export const { setTodos } = todosSlice.actions;
