import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface CurrentTodoState {
  item: Todo | null;
}

const initialState: CurrentTodoState = {
  item: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    selectTodo(state, action: PayloadAction<Todo | null>) {
      return {
        ...state,
        item: action.payload,
      };
    },
  },
});

export const { selectTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
