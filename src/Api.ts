export const TODOS_URL = 'https://mate.academy/students-api/todos';
export const USERS_URL = 'https://mate.academy/students-api/users';

export const getData = async <T>(url: string): Promise<T[]> => {
  const response = await fetch(url);
  const result = await response.json();

  return result.data;
};
