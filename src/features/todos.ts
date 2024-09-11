import { Todo } from './../types/Todo';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const { reducer, actions } = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => action.payload,
  },
});
