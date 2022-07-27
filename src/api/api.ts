import { Todo } from '../types/Todo';
import { User } from '../types/User';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);

  return response.json();
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${userId}`);

  return response.json();
};

export const removeTodo = (todoId :number) => {
  return fetch(`${BASE_URL}/todos/${todoId}`, { method: 'DELETE' });
};
