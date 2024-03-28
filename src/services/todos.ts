import { Todo } from '../types/Todo';
import { getData } from '../utils/httpClient';

export function getTodos() {
  return getData<Todo[]>('/todos.json').then(todos => todos);
}
