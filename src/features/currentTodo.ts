import { User } from './../types/User';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type CurrentTodoType = {
  todo: Todo | null;
  user?: User | null;
};

const initialState: CurrentTodoType = { todo: null, user: null };

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    addCurrentTodo: (state, action: PayloadAction<CurrentTodoType>) => {
      return action.payload;
    },
    removeCurrentTodo: () => {
      return initialState;
    },
  },
});

export default currentTodoSlice.reducer;
export const { addCurrentTodo, removeCurrentTodo } = currentTodoSlice.actions;
