const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export const getTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}/todos.json`);

  return response.json();
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users.json`);

  return response.json();
};
