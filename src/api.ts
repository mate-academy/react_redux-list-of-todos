import { Todo, User } from './react-app-env';
import { TodoStatus } from './types/TodoStatus';

export const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
  const url = `https://mate.academy/students-api/${endpoint}`;

  const response = await fetch(url, options);
  const data: T = await response.json();

  return data;
};

export const getTodos = async (status: TodoStatus): Promise<Todo[]> => {
  let endpoint = 'todos';

  switch (status) {
    case TodoStatus.Active:
      endpoint += '?completed=false';
      break;
    case TodoStatus.Completed:
      endpoint += '?completed=true';
      break;
    default:
      break;
  }

  const todos: Todo[] = await request(endpoint);

  return todos;
};

export const deleteTodo = async (todoId: number) => {
  const endpoint = `todos/${todoId}`;

  return request(endpoint, { method: 'DELETE' });
};

export const getUser = async (userId: number): Promise<User> => {
  const endpoint = `users/${userId}`;

  const user: User = await request(endpoint);

  return user;
};
