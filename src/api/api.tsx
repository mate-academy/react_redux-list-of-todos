const API_URL = 'https://mate-api.herokuapp.com';

const request = (endPoint: string, options = {}) => (
  fetch(`${API_URL}${endPoint}`, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status}: ${response.statusText}`);
    })
    .then(result => result.data)
);

export const getTodosFromServer = () => request('/todos');

export const deleteTodoFromServer = (id: number) => request(`/todos/${id}`, { method: 'DELETE' });

export const getUserFromServer = (id: number) => request(`/users/${id}`);
