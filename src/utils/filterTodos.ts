import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

const filterTodos = (query: string, status: Status, todos: Todo[]) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter((todo) => todo.title.toLocaleLowerCase()
      .includes(query.toLocaleLowerCase()));
  }

  switch (status) {
    case Status.all:
      return todosCopy;
    case Status.active:
      return todosCopy.filter((todo) => !todo.completed);
    case Status.completed:
      return todosCopy.filter((todo) => todo.completed);
    default:
      return todosCopy;
  }
};

export default filterTodos;
