import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/all_Types';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: [] as Todo[],
  reducers: {
    setTodos: (_state, action: PayloadAction<Todo[]>) => action.payload,
  },
});
