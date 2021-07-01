const baseUrl = 'https://mate-api.herokuapp.com';

const request = (endPoint, options = {}) => (
  fetch(`${baseUrl}${endPoint}`, options)
    .then(response => response.json())
    .then(result => result.data)
);

export const getTodos = () => request('/todos');
export const deleteTodo = (id) => request(`/todos/${id}`, { method: 'DELETE' });
export const getUser = userId => request(`/users/${userId}`);
