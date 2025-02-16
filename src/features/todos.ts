import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export interface TodosState {
  todos: Todo[];
  todo: Todo | null;
  user: User | null;
}

const initialState: TodosState = {
  todos: [],
  todo: null,
  user: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
    setSelectedTodo: (state, action: PayloadAction<Todo | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.todo = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      // eslint-disable-next-line no-param-reassign
      state.user = action.payload;
    },
  },
});

export const { setTodos, setSelectedTodo, setUser } = todosSlice.actions;

export default todosSlice.reducer;
