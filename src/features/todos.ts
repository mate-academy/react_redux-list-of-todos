import { createSlice } from '@reduxjs/toolkit';
import { Todo } from '../types/Todo';

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [] as Todo[],
    originalTodos: [] as Todo[],
  },
  reducers: {
    setTodos(state, action) {
      return {
        ...state,
        todos: action.payload,
        originalTodos: action.payload,
      };
    },
    applyFilters(state, action) {
      const newTodos = state.originalTodos
        .filter(todo =>
          todo.title
            .toString()
            .toLowerCase()
            .includes(action.payload.query.toString().toLowerCase()),
        )
        .filter(todo =>
          action.payload.status === 'all'
            ? true
            : action.payload.status === 'active'
              ? !todo.completed
              : todo.completed,
        );

      return {
        ...state,
        todos: newTodos,
      };
    },
  },
});

export const { setTodos, applyFilters } = todosSlice.actions;
