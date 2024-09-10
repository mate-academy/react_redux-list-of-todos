import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (_, action) => {
      return action.payload;
    },
  },
});

export const { actions } = todosSlice;
