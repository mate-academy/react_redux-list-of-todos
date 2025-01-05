import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

interface Action {
  status: Status;
  query: string;
}
export const filterTodos = (todos: Todo[], action: Action): Todo[] => {
  const { status, query = '' } = action;

  const preparedTodos = [...todos].filter((todo: Todo) =>
    todo.title.toLowerCase().includes(query?.toLowerCase()),
  );

  switch (status) {
    case Status.ACTIVE:
      return preparedTodos.filter((todo: Todo) => !todo.completed);
    case Status.COMPLETED:
      return preparedTodos.filter((todo: Todo) => todo.completed);
    default:
      return preparedTodos;
  }
};

export const findTodosByQuery = (todos: Todo[], query: string) => {
  return todos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(query?.toLowerCase()),
  );
};
