import { BASE_URL } from '../../constants/constants';

const TODOS = 'todos';
const USERS = 'users';

const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getTodos = async () => {
  return getData<Todo[]>(`${BASE_URL}${TODOS}`);
};

export const getUsers = async () => {
  return getData<User[]>(`${BASE_URL}${USERS}`);
};
