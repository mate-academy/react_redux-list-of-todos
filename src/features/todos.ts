import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    set: (_, action) => {
      return action.payload;
    },
  },
});

const todos = (state: RootState) => state.todos;

export const todosSelector = createSelector([todos], value => {
  return value;
});

export const { actions } = todosSlice;
