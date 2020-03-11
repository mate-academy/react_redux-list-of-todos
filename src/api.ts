const API_URL = 'https://jsonplaceholder.typicode.com/';

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  return response.json();
};

export const getTodos = (): Promise<Todos> => {
  return getData<Todos>(`${API_URL}todos`);
};

export const getUsers = (): Promise<Users> => {
  return getData<Users>(`${API_URL}users`);
};
