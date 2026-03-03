import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { selectFilterParams, FilterState } from './filter';
import { Todo } from '../types/Todo';

type TodosState = {
  items: Todo[];
  loading: boolean;
  error: string | null;
};

const initialState: TodosState = {
  items: [],
  loading: false,
  error: null,
};

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    loadStart(state) {
      return { ...state, loading: true, error: null };
    },
    loadSuccess(state, action: PayloadAction<Todo[]>) {
      return { ...state, items: action.payload, loading: false, error: null };
    },
    loadFailure(state, action: PayloadAction<string>) {
      return { ...state, error: action.payload, loading: false };
    },
    setTodos(state, action: PayloadAction<Todo[]>) {
      return { ...state, items: action.payload };
    },
  },
});

export const { loadStart, loadSuccess, loadFailure, setTodos } =
  todosSlice.actions;

type TodosSelectorsState = { todos: TodosState; filter: FilterState };

const selectTodosState = (state: TodosSelectorsState) => state.todos;

export const selectTodos = (state: TodosSelectorsState) =>
  selectTodosState(state).items;
export const selectTodosLoading = (state: TodosSelectorsState) =>
  selectTodosState(state).loading;
export const selectTodosError = (state: TodosSelectorsState) =>
  selectTodosState(state).error;

export const selectFilteredTodos = createSelector(
  [selectTodos, (state: TodosSelectorsState) => selectFilterParams(state)],
  (items, filter) => {
    const query = filter.query.trim().toLowerCase();

    return items.filter(todo => {
      const matchesQuery =
        query === '' || todo.title.toLowerCase().includes(query);
      const matchesStatus =
        filter.status === 'active'
          ? !todo.completed
          : filter.status === 'completed'
            ? todo.completed
            : true;

      return matchesQuery && matchesStatus;
    });
  },
);
