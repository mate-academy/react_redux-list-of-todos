import { State } from '../react-app-env';

export const getTodosSelector = (state: State) => state.todos;

export const getUserSelector = (state: State) => state.user;

export const getFilterTodos = (query: string, type: string) => {
  if (type === 'title') {
    return (state: State) => (
      state.todos.filter(item => item.title.includes(query))
    );
  }

  return (state: State) => (
    state.todos.filter(item => {
      switch (query) {
        case 'all':
          return true;
          break;
        case 'completed':
          return item.completed;
          break;
        case 'active':
          return !item.completed;
          break;
        default:
          return false;
      }
    })
  );
};
