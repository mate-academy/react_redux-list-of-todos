import { State } from '../react-app-env';

export const getTodosSelector = (state: State) => state.todos;
export const getUserSelector = (state: State) => state.user;

export const getVisibleTodos = (query: string) => {
  return (state: State) => {
    return state.todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));
  };
};
