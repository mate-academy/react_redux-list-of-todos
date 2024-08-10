import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodoState = Todo | null;

const initialState: CurrentTodoState = null as Todo | null;

export const currentTodoSlice: Slice<Todo | null> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<Todo>) => {
      return action.payload;
    },
    removeCurrentTodo: () => {
      return null;
    },
  },
});
