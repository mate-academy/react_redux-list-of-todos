import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setTodo: (currentTodo, action: PayloadAction<Todo>) => action.payload,
    clearCurrent: () => null,
  },
});
