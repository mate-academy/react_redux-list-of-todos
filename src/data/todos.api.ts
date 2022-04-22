import { Todo } from '../types/todo.type';
import { getData } from './api';
import { ENDPOINTS } from './api.constants';

export const getTodos = (): Promise<Todo[]> => getData(`${ENDPOINTS.todos}`);

export const removeTodo = (todoId: number): Promise<number> => getData(`${ENDPOINTS.todos}/${todoId}`, {
  method: 'DELETE',
});
