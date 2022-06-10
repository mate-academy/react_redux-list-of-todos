const API_URL = 'https://mate.academy/students-api';

const request = (url: string, method?: RequestInit | undefined) => {
  return fetch(`${API_URL}${url}`, method)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`${response.status} - ${response.statusText}`),
        );
      }

      return response.json();
    });
};

export function getAllTodos(): Promise<Todo[]> {
  return request('/todos');
}

export function getUser(userId: number): Promise<User> {
  return request(`/users/${userId}`);
}

export function deleteTodo(todoId: number) {
  return request(`/todos/${todoId}`, {
    method: 'DELETE',
  });
}
