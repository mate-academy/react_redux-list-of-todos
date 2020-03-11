import { URL_TODOS, URL_USES } from './constatns';

async function getData <T>(url: string): Promise<T> {
  const response = await fetch(url);

  return response.json();
}

export const getTodos = (): Promise<Todo[]> => {
  return getData(URL_TODOS);
};

export const getUsers = (): Promise<User[]> => {
  return getData(URL_USES);
};
