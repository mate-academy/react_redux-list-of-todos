import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

const initialState = null as Todo | null;

export const { reducer, actions } = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    clear: () => null,
    set: (searchValue: Todo | null, action: PayloadAction<Todo>) =>
      searchValue || action.payload,
  },
});
