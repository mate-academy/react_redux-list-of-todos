/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { LoadingStatus } from '../types/LoadingStatus';

type State = {
  todos: Todo[];
  loadingStatus: LoadingStatus;
};

const initialState: State = {
  todos: [],
  loadingStatus: 'success',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<LoadingStatus>) => {
      state.loadingStatus = action.payload;
    },
    set: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
  },
});
