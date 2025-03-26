import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClients';

export function getCompletedTodo() {
  return getData<Todo[]>('/todos').then(todos =>
    todos.filter(todo => todo.completed),
  );
}
