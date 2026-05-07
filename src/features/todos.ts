/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },

    update: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex(todo => todo.id === action.payload.id);

      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { set, update } = todosSlice.actions;
