import { getData } from './httpClient';
import { Todo } from './types/Todo';

export const getTodos = () => {
  return getData<Todo[]>('/todos');
};
