const request = (
  endpoint: string,
) => {
  return fetch(`https://mate.academy/students-api/${endpoint}`)
    .then(response => response.json());
};

export const getTodos = () => request('todos');

export const getUser = (userId: number) => request(`users/${userId}`);
