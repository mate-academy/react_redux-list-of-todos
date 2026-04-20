import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

type TodosState = {
  items: Todo[];
  currentTodo: Todo | null;
};

const initialState: TodosState = {
  items: [],
  currentTodo: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => ({
      ...state,
      items: action.payload,
    }),
    setCurrentTodo: (state, action: PayloadAction<Todo>) => ({
      ...state,
      currentTodo: action.payload,
    }),

    clearCurrentTodo: state => ({
      ...state,
      currentTodo: null,
    }),
  },
});

export const { setTodos, setCurrentTodo, clearCurrentTodo } =
  todosSlice.actions;
