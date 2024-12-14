import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export interface Todos {
  todos: Todo[];
  loaded: boolean;
  hasError: boolean;
}

const initialState: Todos = {
  todos: [],
  loaded: true,
  hasError: false,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos(state, action) {
      return {
        ...state,
        todos: action.payload,
      };
    },
    setLoaded(state, action) {
      return {
        ...state,
        loaded: action.payload,
      };
    },
  },
});

export const selectTodosLoaded = (state: RootState) =>
  state.todosReducer.loaded;
export const selectTodos = (state: RootState) => state.todosReducer.todos;

export const { setTodos, setLoaded } = todosSlice.actions;
export default todosSlice.reducer;
