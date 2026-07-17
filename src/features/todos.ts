import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: { addAll: (state, action) => action.payload },
});

export const { actions: todosActions, reducer: todosReducer } = todosSlice;
