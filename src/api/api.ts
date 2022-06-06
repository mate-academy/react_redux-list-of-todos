const API_URL = 'https://mate.academy/students-api/';

const request = async (url: string, postfix: string) => {
  const response = await fetch(`${url}${postfix}`);

  return response.json();
};

export const getTodos = () => request(API_URL, 'todos');
export const getUsers = (id:number) => request(API_URL, `users/${id}`);
