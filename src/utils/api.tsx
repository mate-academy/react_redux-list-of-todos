const BASE_URL = 'https://mate-api.herokuapp.com';

const request = (url:string) => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  })
  .then(result => result.data);

export const getTodos = async () => {
  const response = await request('/todos');

  return response;
};

export const getUser = async (id: number) => {
  const response = await request(`/users/${id}`);

  console.log(response);

  return response;
};
