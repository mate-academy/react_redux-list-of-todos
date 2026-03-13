import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../types/TodoType';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as TodoType[],
  reducers: {
    setTodos: (_state, action) => action.payload,
  },
});
