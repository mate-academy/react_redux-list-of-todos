import { BASE_URL } from '../constants/api';
import { Todo, User } from '../constants/types';

const loadData = async <T>(specificUrl: string): Promise<T[]> => {
  const response = await fetch(`${BASE_URL}/${specificUrl}`, {
    mode: 'no-cors',
  });

  return response.json();
};

export const loadTodos = async (): Promise<Todo[]> => {
  return loadData<Todo>('todos');
};

export const loadUsers = async (): Promise<User[]> => {
  return loadData<User>('users');
};
