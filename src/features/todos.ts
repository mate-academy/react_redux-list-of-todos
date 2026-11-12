import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState: Todo[] = [];

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_, action) => action.payload,
  },
});

export const { setTodos } = todosSlice.actions;
export const todosReducer = todosSlice.reducer;
