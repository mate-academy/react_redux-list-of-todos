const BASE_URL = 'https://mate-api.herokuapp.com';

export function getTodos() {
  return fetch(`${BASE_URL}/todos`)
    .then(response => response.json());
}

export function getUser(userId) {
  return fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json());
}
