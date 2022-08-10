import { Todo, User } from '../react-app-env';

const BASE_URL = 'https://mate.academy/students-api';

function wait(delay: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function get<T>(url: string): Promise<T> {
  await wait(1000);
  const res = await fetch(BASE_URL + url);

  return res.json();
}

export const getTodos = () => {
  return get<Todo[]>('/todos');
};

export const getUser = (userId:number) => {
  return get<User>(`/users/${userId}`);
};
