const BASE_URL = 'https://mate.academy/students-api';

const getData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
};

export const requestTodos = async () => {
  const data = await getData('/todos');

  return data;
};

export const getSelectedUser = async (id: number) => {
  try {
    const data = await getData(`/users/${id}`);

    return data;
  } catch (error) {
    return null;
  }
};
