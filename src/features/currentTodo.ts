import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type State = Todo | null;

const initialState = null as State;

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo: (_, { payload }: PayloadAction<State>) => {
      return payload;
    },
  },
});
