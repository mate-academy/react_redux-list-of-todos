import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface CurrTodoState {
  value: Todo | null;
}

const initialState: CurrTodoState = { value: null };

export const currTodoSlice = createSlice({
  name: 'currTodo',
  initialState,
  reducers: {
    selectTodo: (state: CurrTodoState, action: PayloadAction<Todo>) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
    deselectTodo: (state: CurrTodoState) => {
      // eslint-disable-next-line no-param-reassign
      state.value = null;
    },
  },
});

export const { selectTodo, deselectTodo } = currTodoSlice.actions;

export default currTodoSlice.reducer;
