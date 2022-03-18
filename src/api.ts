const apiUrl = 'https://mate.academy/students-api/';

async function getData(url: string) {
  const responce = await fetch(apiUrl + url);

  return responce.json();
}

export const getTodos = (): Promise<Todo[]> => getData('todos');

export const getUser = (userId: number): Promise<User> => getData(`users/${userId}`);
