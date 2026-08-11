import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo, Status } from '../types/Todo';

export interface CurrentTodoState {
  status: Status;
  todo: Todo | null;
}

const initialState: CurrentTodoState = {
  status: 'idle',
  todo: null,
};

export const currentTodoSlice = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.todo = action.payload;
    },
    setStatus: (state, action: PayloadAction<Status>) => {
      // eslint-disable-next-line no-param-reassign
      state.status = action.payload;
    },
  },
});

export const { setCurrentTodo, setStatus } = currentTodoSlice.actions;
