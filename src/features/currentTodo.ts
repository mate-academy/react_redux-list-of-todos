import { PayloadAction, Reducer, Slice, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export type CurrentTodoState = {
  currentTodo: Todo | null;
};

const initialState: CurrentTodoState = {
  currentTodo: null,
};

export const currentTodoSlice: Slice<CurrentTodoState> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      /* eslint-disable-next-line no-param-reassign */
      state.currentTodo = action.payload;
    },
    clearCurrentTodo: state => {
      /* eslint-disable-next-line no-param-reassign */
      state.currentTodo = null;
    },
  },
});

export const { setCurrentTodo, clearCurrentTodo } = currentTodoSlice.actions;
export default currentTodoSlice.reducer as Reducer<CurrentTodoState>;
