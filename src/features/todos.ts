import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoStatus = {
  todos: Todo[];
  loading: boolean;
};

const initialState: TodoStatus = {
  todos: [],
  loading: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: action.payload };
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setTodos, setIsLoading } = todosSlice.actions;
export default todosSlice.reducer;
