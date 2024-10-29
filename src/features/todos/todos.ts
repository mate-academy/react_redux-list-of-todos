import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Todo } from '../../types/Todo';

type Todos = Todo[];

const initialState = [] as Todos;

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (_, action: PayloadAction<Todos>) => action.payload,
  },
});

export const { setTodos } = todosSlice.actions;
