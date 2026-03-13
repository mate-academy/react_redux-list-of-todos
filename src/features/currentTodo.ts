import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../types/TodoType';

const initialState = null as TodoType | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    getCurrentTodo: (_state, action) => action.payload,
  },
});
