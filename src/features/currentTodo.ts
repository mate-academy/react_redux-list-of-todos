import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export interface CurrentTodo {
  currTodo: Todo | null;
}

const initialState: CurrentTodo = {
  currTodo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo(state, action) {
      return {
        ...state,
        currTodo: action.payload,
      };
    },
    delCurrentTodo(state) {
      return {
        ...state,
        currTodo: null,
      };
    },
  },
});

export const selectCurrTodo = (state: RootState) =>
  state.curTodoReducer.currTodo;
export const { setCurrentTodo, delCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer;
