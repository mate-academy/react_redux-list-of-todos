const baseUrl = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${baseUrl}/todos`)
    .then(response => response.json());
};

export const getUsers = (userId:number) => {
  return fetch(`${baseUrl}/users/${userId}`)
    .then(response => {
      return response.json();
    });
};

export const deleteTodo = (todoId: number) => {
  return fetch(`${baseUrl}/todos/${todoId}`, { method: 'DELETE' });
};
