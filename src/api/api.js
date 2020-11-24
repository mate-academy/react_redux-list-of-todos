const BASE_URL = 'https://mate-api.herokuapp.com';

export function todosFromServer() {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
}

export function userFromServer(userId) {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json());
}
