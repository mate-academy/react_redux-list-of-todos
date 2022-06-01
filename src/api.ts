// import { User } from './Types/User';
// import { Todo } from './Types/Todo';

const BASE_URL = 'https://mate.academy/students-api';

export const getTodosFromServer = async (): Promise<Todo[]> => {
  try {
    const response = await fetch(`${BASE_URL}/todos`);
    const todos = await response.json();

    return todos;
  } catch (error) {
    if (
      error
      && typeof error === 'object'
      && (error as Error).message === 'Failed to fetch'
    ) {
      throw new Error('Now you cannot connect the server and get todos');
    } else {
      throw error;
    }
  }
};

export const getUserFromServer = async (id: number): Promise<User> => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    const users = await response.json();

    return users;
  } catch (error) {
    if (
      error
      && typeof error === 'object'
      && (error as Error).message === 'Failed to fetch'
    ) {
      throw new Error('Cannot connect the server and get users');
    } else {
      throw error;
    }
  }
};
