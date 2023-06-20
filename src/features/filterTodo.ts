import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

export const filterTodo = {
  getTodos: (state: RootState) => state.todos,
  getFilteredTodos: (state: RootState) => {
    const { todos, filter } = state;
    const { query, status } = filter;

    let filteredTodos: Todo[];

    switch (status) {
      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case 'all':
      default:
        filteredTodos = todos;
        break;
    }

    return filteredTodos.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  },
};
