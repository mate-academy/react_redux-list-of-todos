import Todo from '../types/Todo';
import { request } from './api';

export const getTodos = (): Promise<Todo[]> => {
  return request('/todos');
};
