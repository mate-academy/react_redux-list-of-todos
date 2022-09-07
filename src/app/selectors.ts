import { RootState } from './store';

const currentTodoSelector = (state: RootState) => state.currentTodo;

export const CURRENT_TODOS_SELECTORS = {
  currentTodo: currentTodoSelector,
};

const userSelector = (state: RootState) => state.user;

export const USER_SELECTORS = {
  user: userSelector,
};

const filterSelector = (state: RootState) => state.filter;

export const FILTER_SELECTORS = {
  filter: filterSelector,
};

const todosSelector = (state: RootState) => state.todos;

const filteredTodosSelector = (state: RootState) => {
  const { todos } = state;
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

  const filteredTodosByQuery = query !== ''
    ? todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ))
    : filterTodosByStatus();

  return filteredTodosByQuery;
};

export const TODOS_SELECTORS = {
  todos: todosSelector,
  filteredTodos: filteredTodosSelector,
};
