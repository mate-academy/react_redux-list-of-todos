import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addCurrentTodo: (_state, action) => action.payload,
    clearCurrentTodo: () => null,
  },
});
