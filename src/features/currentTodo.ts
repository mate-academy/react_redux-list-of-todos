import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodo = Todo | null;
const initialState = null as CurrentTodo;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set(
      currentTodo: CurrentTodo,
      { payload }: PayloadAction<CurrentTodo>,
    ): CurrentTodo {
      return payload;
    },
  },
});
