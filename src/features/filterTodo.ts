import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export const filterTodo = {
  getTodos: (state: RootState) => state.todos,
  getFilteredTodos: (state: RootState) => {
    const { todos, filter } = state;
    const { query, status } = filter;

    let FilteredTodos: Todo[];

    switch (status) {
      case 'completed':
        FilteredTodos = todos.filter(todo => todo.completed);
        break;
      case 'active':
        FilteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'all':
      default:
        FilteredTodos = todos;
        break;
    }

    return FilteredTodos
      .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
  },
};
