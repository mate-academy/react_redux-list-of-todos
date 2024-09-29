import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type currentTodo = Todo | null;

const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState: null as Todo | null,
  reducers: {
    setCurrentTodo: (_, action: PayloadAction<currentTodo>) => {return action.payload},
  },
});

export default currentTodoSlice.reducer;
export const { actions } = currentTodoSlice;
