import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodo = Todo | null;
const initialState = null as CurrentTodo;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    set(state: CurrentTodo, action: PayloadAction<CurrentTodo>): CurrentTodo {
      return action.payload;
    },
  },
});
