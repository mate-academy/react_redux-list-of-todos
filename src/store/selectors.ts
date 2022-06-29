import { RootState } from '../react-app-env';

export const getTodosSelector = (state: RootState) => state.todos;

export const getUserSelector = (state: RootState) => state.user;

export const getActiveTodosSelector = () => {
  const filteredTodosSelector = (state: RootState) => {
    return state.todos.filter(todo => todo.completed);
  };

  return filteredTodosSelector;
};

export const getFilteredTodosByTitleSelector = (query: string) => {
  return (state: RootState) => {
    return state.todos.filter(todo => todo.title.includes(query));
  };
};
