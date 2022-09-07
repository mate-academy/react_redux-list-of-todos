import { RootState } from './store';

const currentTodoSelector = (state: RootState) => state.currentTodo;

export const CURRENT_TODOS_SELECTORS = {
  currentTodo: currentTodoSelector,
};

const userSelector = (state: RootState) => state.user;

export const USER_SELECTORS = {
  user: userSelector,
};

const querySelector = (state: RootState) => state.filter.query;
const statusSelector = (state: RootState) => state.filter.status;

export const FILTER_SELECTORS = {
  query: querySelector,
  status: statusSelector,
};

const todosSelector = (state: RootState) => state.todos.todos;
const isLoadingTodosSelector = (state: RootState) => state.todos.isLoading;
const errorTodosSelector = (state: RootState) => state.todos.error;

const filteredTodosSelector = (state: RootState) => {
  const { todos } = state.todos;
  const { query, status } = state.filter;

  const filterTodosByStatus = () => {
    switch (status) {
      case 'active':
        return todos.filter(todo => todo.completed === false);

      case 'completed':
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  };

  const todosFilteredByStatus = filterTodosByStatus();

  const filteredTodosByQuery = query !== ''
    ? todosFilteredByStatus.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ))
    : todosFilteredByStatus;

  return filteredTodosByQuery;
};

export const TODOS_SELECTORS = {
  todos: todosSelector,
  isLoading: isLoadingTodosSelector,
  error: errorTodosSelector,
  filteredTodos: filteredTodosSelector,
};
