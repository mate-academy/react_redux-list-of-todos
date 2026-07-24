import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodoStatus = {
  todos: Todo[];
  isLoading: boolean;
};

const initialState: TodoStatus = {
  todos: [],
  isLoading: true,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: action.payload };
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
  },
});

export const { setTodos, setIsLoading } = todosSlice.actions;
export default todosSlice.reducer;
