import { Todo } from './type/todo';

const BASE_URL = 'https://mate.academy/students-api/';

export const getTodosFS = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}todos`);
  const todos = await response.json();

  return todos;
};

export const getUserFS = async (userid: number) => {
  const response = await fetch(`${BASE_URL}users/${userid}`);
  const user = await response.json();

  return user;
};
