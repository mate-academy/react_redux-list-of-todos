import { RootState } from '../react-app-env';

export const getTodosSelector = (state: RootState) => state.todos;

export const getUserSelector = (state: RootState) => state.user;

export const getFilteredTodosSelector = () => {
  const filteredTodosSelector = (state: RootState) => {
    return state.todos.filter(todo => todo.completed);
  };

  return filteredTodosSelector;
};
