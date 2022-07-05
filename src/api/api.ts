const BASE_URL = 'https://mate.academy/students-api';

type Option = {
  method: string
};

const request = (url: string, option?: Option) => (
  fetch(`${BASE_URL}${url}`, option)
    .then((res) => {
      if (!res.ok) {
        throw new Error('Something wrong...');
      }

      return res.json();
    }));

export const getTodos = () => request('/todos');

export const getUser = (id: number) => request(`/users/${id}`);

export const removeTodo = (id: number) => request(
  `/todos/${id}`,
  { method: 'DELETE' },
);
