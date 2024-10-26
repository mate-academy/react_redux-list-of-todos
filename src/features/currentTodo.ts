import { createSelector, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: { set: (_, { payload }) => payload },
});

const currentTodo = (state: RootState) => state.currentTodo;

export const currentTodoSelector = createSelector([currentTodo], value => {
  return value;
});

export const { actions } = currentTodoSlice;
