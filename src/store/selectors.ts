import { State } from '../react-app-env';

export enum Select {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

export const getTodosSelector = (query = '', selected = Select.all) => {
  return (state: State) => {
    const todosByQuery = state.todos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase())
    ));

    const todosFiltered = todosByQuery.filter(todo => {
      switch (selected) {
        case Select.active:
          return !todo.completed;
        case Select.completed:
          return todo.completed;
        default:
          return todo;
      }
    });

    return todosFiltered;
  };
};

export const getUserSelector = (state: State) => state.user;
