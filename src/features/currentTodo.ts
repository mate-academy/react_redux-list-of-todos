import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: { setTodo: (_, action) => action.payload, clearTodo: () => null },
});

export const { actions } = currentTodoSlice;
