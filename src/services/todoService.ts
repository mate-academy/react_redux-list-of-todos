import { request } from './api';
import { Todo } from '../types/Todo';

export const todoService = {
  getAll() {
    return request<Todo[]>('/todos.json');
  },
};
