import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type InitialState = Todo[];

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    todos: (state: InitialState, action: PayloadAction<InitialState>) => {
      return action.payload;
    },
  },
});

export const { actions } = todosSlice;
