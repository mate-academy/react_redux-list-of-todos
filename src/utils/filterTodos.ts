import { TodoFilterStatus } from '../types/Enum';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filterStatus: TodoFilterStatus) => {
  switch (filterStatus) {
    case TodoFilterStatus.COMPLETED:
      return todos.filter(({ completed }) => completed);
    case TodoFilterStatus.UNCOMPLETED:
      return todos.filter(({ completed }) => !completed);
    default:
      return todos;
  }
};
