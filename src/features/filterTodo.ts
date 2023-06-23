import { Todo } from '../types/Todo';
import { RootState } from '../app/store';

import { FilterByParameters } from '../utils/filterByParameters';

export const filterTodo = {
  getTodos: (state: RootState) => state.todos,
  getFilteredTodos: (state: RootState) => {
    const { todos, filter } = state;
    const { query, status } = filter;

    let filteredTodos: Todo[];

    switch (status) {
      case FilterByParameters.Completed:
        filteredTodos = todos.filter(todo => todo.completed);
        break;
      case FilterByParameters.Active:
        filteredTodos = todos.filter(todo => !todo.completed);
        break;
      case FilterByParameters.All:
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
