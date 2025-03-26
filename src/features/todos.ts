import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (state, action: { payload: Todo[] }) => {
      return [...state, ...action.payload];
    },
  },
});
