import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

const TODO_FILTERS = {
  all: (todos: Todo[]) => {
    return todos;
  },

  active: (todos: Todo[]) => {
    return todos.filter(todo => !todo.completed);
  },

  completed: (todos: Todo[]) => {
    return todos.filter(todo => todo.completed);
  },
};

const getTodoFilter = (status: Status) => TODO_FILTERS[status];

const getFilteredTodos = (todos: Todo[], status: Status) => {
  if (!status) {
    return todos;
  }

  const filterTodosFunction = getTodoFilter(status);
  const filterTodo = filterTodosFunction(todos);

  return filterTodo;
};

export default getFilteredTodos;
