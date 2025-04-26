import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

interface TodosState {
  todos: Todo[];
  loader: boolean;
}

const initialState: TodosState = {
  todos: [],
  loader: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      // eslint-disable-next-line no-param-reassign
      state.todos = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      // eslint-disable-next-line no-param-reassign
      state.loader = action.payload;
    },
  },
});

export const { setTodos, setLoader } = todosSlice.actions;
export default todosSlice.reducer;
