import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodoState = Todo | null;

const initialState: CurrentTodoState = null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (
      _state,
      action: PayloadAction<CurrentTodoState>,
    ): CurrentTodoState => action.payload,
  },
});

export const { setCurrentTodo } = currentTodoSlice.actions;
