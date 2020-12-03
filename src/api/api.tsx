const BASE_URL = `https://mate-api.herokuapp.com`;

export const getTodos = async() => {
  return await fetch(`${BASE_URL}/todos`)
    .then(promise => promise.json())
    .then(result => result.data);
};

export const getUsers = async(userId: number) => {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(promise => promise.json())
    .then(result => result.data);
};
