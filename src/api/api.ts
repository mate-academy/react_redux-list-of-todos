const API_URL = 'https://mate.academy/students-api/';

export const getTodos = async (complete = ''): Promise<Todo[]> => {
  let url = `${API_URL}todos`;

  if (complete !== '') {
    url += `?completed=${complete}`;
  }

  const response = await fetch(url);

  return response.json();
};

export const getUser = async (userId = 0): Promise<User> => {
  let url = `${API_URL}users/`;

  if (userId !== 0) {
    url += `${userId}`;
  }

  const response = await fetch(url);

  if (response.status === 404) {
    throw new Error();
  }

  return response.json();
};

export const toggleTodo = async (id: number, status: boolean): Promise<Todo> => {
  const url = `${API_URL}todos/${id}`;

  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ completed: !status }),
  });

  if (response.status === 404) {
    throw new Error();
  }

  return response.json();
};
