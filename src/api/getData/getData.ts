import { BASE_URL } from '../../constants/constants';

const todos = 'todos';
const users = 'users';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getTodos = async () => {
  return getData<Todo[]>(`${BASE_URL}${todos}`);
};

export const getUsers = async () => {
  return getData<User[]>(`${BASE_URL}${users}`);
};
