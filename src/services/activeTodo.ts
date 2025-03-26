import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClients';

export function getActiveTodo() {
  return getData<Todo[]>('/todos').then(todos =>
    todos.filter(todo => !todo.completed),
  );
}
