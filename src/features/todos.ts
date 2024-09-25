import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type StateType = {
  todos: Todo[];
};

export const initialState: StateType = {
  todos: [],
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
  },
});

export default todosSlice.reducer;
export const { setTodos } = todosSlice.actions;
