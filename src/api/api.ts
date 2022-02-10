const API_URL = 'https://mate.academy/students-api';

export function getTodos(): Promise<Todo[]> {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
}

export function getUser(userId: number): Promise<User> {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json())
    .catch(error => {
      throw new Error(String(error));
    });
}
