import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface PropsTodos {
  todos: Todo[];
}

const initialState: PropsTodos = {
  todos: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
