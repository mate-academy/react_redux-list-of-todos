/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { ErrorType } from '../types/Error';

export interface TodosState {
  items: Todo[];
  isLoading: boolean;
  error: ErrorType;
}

const initialState: TodosState = {
  items: [],
  isLoading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState: initialState,
  reducers: {
    setLoading: state => {
      state.isLoading = true;
      state.error = null;
    },
    set: (state, action: PayloadAction<Todo[]>) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<ErrorType>) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    add: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },

    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },

    toggle: (state, action: PayloadAction<number>) => {
      const todoToToggle = state.items.find(todo => todo.id === action.payload);

      if (todoToToggle) {
        todoToToggle.completed = !todoToToggle.completed;
      }
    },
  },
});

export const {
  setLoading,
  set: setTodos,
  setError,
  add: addTodo,
  remove: removeTodo,
  toggle: toggleTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
