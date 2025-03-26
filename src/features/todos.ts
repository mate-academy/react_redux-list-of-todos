import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_, action: PayloadAction<Todo[]>) => {
      return action.payload;
    },
  },
});
