const API_URL = 'https://mate.academy/students-api';

export const getData = async (url: string) => {
  const responce = await fetch(`${API_URL}/${url}`);

  return responce.json();
};

export const getTodos = (): Promise<Todo[]> => getData('todos');

export const getUser = (userId: number) => getData(`users/${userId}`);

export async function removeTodo(id: number) {
  fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
}
