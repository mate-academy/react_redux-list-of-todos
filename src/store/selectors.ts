import { State } from '../react-app-env';

export const getTodosSelector = (state: State) => state.todos;

export const getUserSelector = (state: State) => state.user;

export const getFilteredTodosSelector = (query: string) => {
  return (state: State) => {
    return state.todos.filter(todo => (
      todo.title.includes(query)
    ));
  };
};

export const getComplitedTodosSelector = () => {
  return (state: State) => {
    return state.todos.filter(todo => (
      todo.completed
    ));
  };
};

export const getActiveTodosSelector = () => {
  return (state: State) => {
    return state.todos.filter(todo => (
      todo.completed === false
    ));
  };
};
