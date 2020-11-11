// eslint-disable-next-line
const API_URL = `https://mate-api.herokuapp.com`;

export const todosFromServer = async() => {
  const todos = fetch(`${API_URL}/todos`)
    .then(promise => promise.json())
    .then(result => result.data);

  return todos;
};

export const userFromServer = async(userId: number) => {
  const user = fetch(`${API_URL}/users/${userId}`)
    .then(promise => promise.json())
    .then(result => result.data);

  return user;
};
