import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type CurrentTodo = Todo | null;

const initialState = null as Todo | null;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (state: CurrentTodo, action: PayloadAction<CurrentTodo>) => {
      {
        return action.payload;
      }
    },
  },
});

export const { actions } = currentTodoSlice;
