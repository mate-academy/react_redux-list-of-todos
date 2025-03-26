import { createSlice, PayloadAction, Slice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

type CurrentTodoState = {
  todo: Todo | null;
  user: User | null;
};

const initialState: CurrentTodoState = {
  todo: null,
  user: null,
};

const currentTodoSlice: Slice<CurrentTodoState> = createSlice({
  name: 'currentTodo',
  initialState,
  reducers: {
    setCurrentTodo: (state, action: PayloadAction<Todo>) => {
      // eslint-disable-next-line no-param-reassign
      state.todo = action.payload;
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export default currentTodoSlice.reducer;
export const { setCurrentTodo, setCurrentUser } = currentTodoSlice.actions;
