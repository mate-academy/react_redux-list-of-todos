import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClients';

export function getAllTodo() {
  return getData<Todo[]>('/todos');
}
