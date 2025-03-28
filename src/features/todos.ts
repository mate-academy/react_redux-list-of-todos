import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export interface TodosState {
  loading: boolean;
  todos: Todo[];
  error: string;
}

const initialState: TodosState = {
  loading: false,
  todos: [] as Todo[],
  error: '',
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      return { ...state, todos: action.payload };
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      return { ...state, todos: [...state.todos, action.payload] };
    },
  },
});

export const { setTodos, addTodo } = todosSlice.actions;
export default todosSlice.reducer;
