const API_URLS = ['https://mate-academy.github.io/react_dynamic-list-of-todos/api/users.json',
  'https://mate-academy.github.io/react_dynamic-list-of-todos/api/todos.json'];

export const getDataFromServer = () => {
  return Promise.all(API_URLS.map(url => fetch(url)))
    .then(response => Promise.all(response.map(responseFromServer => responseFromServer.json())));
};
