/* eslint-disable max-len */
import { getData } from './api';
// import { ENDPOINTS } from './api.constants';

// export const getTodos = (): Promise<Todo[]> => getData<Todo[]>(ENDPOINTS.todos);

export const getTodos = (): Promise<Todo[]> => getData('/todos');

export const removeTodo = (todoId: number): Promise<number> => getData(`/todos/${todoId}`, {
  method: 'DELETE',
});
