const todosURL = getFetch('https://jsonplaceholder.typicode.com/todos');
const usersURL = getFetch('https://jsonplaceholder.typicode.com/users');

function getFetch(url) {
  return fetch(url)
    .then(response => response.json());
}

export { todosURL, usersURL };
