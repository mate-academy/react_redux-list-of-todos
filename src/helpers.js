const BASE_URL = 'https://mate-api.herokuapp.com';

const request = url => (
  fetch(url)
    .then(response => response.json())
    .catch(error => error)
);

export function loadTodos() {
  return request(`${BASE_URL}/todos`)
    .then(response => response.data.filter((todo) => {
      if (Object.values(todo)
        .some(field => field === null || field === '')) {
        return false;
      }

      return todo;
    }));
}

export function loadUser(userId) {
  return request(`${BASE_URL}/users/${userId}`);
}
