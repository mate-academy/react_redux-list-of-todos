const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodosFormServer = async() => {
  const serverResponse = await fetch(`${BASE_URL}/todos/`)
    .then(response => response.json())
    .then(result => {
      if (!result.data) {
      throw new Error(`${result.status} - ${result.statusText}`);
    }

      return result.data;
    })

  return serverResponse;
};

export const getUserFormServer = async(id: number) => {
  const userInfo = await fetch(`${BASE_URL}/users/${id}`)
    .then(response =>
      response.json())
    .then(result => {
      if (!result.data) {
      throw new Error(`${result.status} - ${result.statusText}`);
    }

      return result.data;
    })

  return userInfo;
};
