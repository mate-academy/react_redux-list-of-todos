import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type InitialStateType = { items: Todo[] };

const initialState: InitialStateType = {
  items: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadTodos: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
    },
  },
});

export const { loadTodos } = todosSlice.actions;
