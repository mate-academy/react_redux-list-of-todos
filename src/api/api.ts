function request(endpoint: string) {
  return fetch(`https://jsonplaceholder.typicode.com/${endpoint}`)
    .then(response => response.json());
}

export function getTodos(): Promise<Todo[]> {
  return request('todos');
}

export function getUser(userId: number): Promise<User> {
  return request(`users/${userId}`);
}

export const deleteOneTodo = (todoId: number): Promise<Todo> => {
  return fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
    method: 'DELETE',
  }).then(response => response.json());
};
