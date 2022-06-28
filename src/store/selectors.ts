import { RootState } from '.';

export const getTodosSelector = (state: RootState) => state.todos;
export const getFilteringTodos = (query: string) => {
  return (state: RootState) => {
    return state.todos.filter(todo => (
      todo.title.toLowerCase().includes(query)
    ));
  };
};

export const showUserSelector = (state: RootState) => state.user;
