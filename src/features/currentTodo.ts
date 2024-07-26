/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

interface currentTodoState {
  todo: Todo | null;
  user: User | null;
}

const initialState: currentTodoState = {
  todo: null,
  user: null,
};

export const currentTodoSlice: Slice<currentTodoState> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      state.todo = action.payload;
    },

    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
});

export const { setCurrentTodo, setCurrentUser } = currentTodoSlice.actions;

export default currentTodoSlice.reducer;
