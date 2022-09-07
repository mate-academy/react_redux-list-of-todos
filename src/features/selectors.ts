import { RootState } from '../app/store';

const filterSelector = (state: RootState) => state.filter;

export const FILTER_SELECTOR = {
  filter: filterSelector,
};

const todosSelector = (state: RootState) => state.todos;

export const TODOS_SELECTOR = {
  todos: todosSelector,
};

const currentTodosSelector = (state: RootState) => state.currentTodo;

export const CURRENT_TODO_SELECT = {
  currentTodo: currentTodosSelector,
};
