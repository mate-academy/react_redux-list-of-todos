import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    add(state, action: PayloadAction<Todo | Todo[]>) {
      if (Array.isArray(action.payload)) {
        action.payload.forEach(todo => state.push(todo));
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const actions = todosSlice.actions;
