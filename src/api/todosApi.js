const URL = 'https://jsonplaceholder.typicode.com/todos';
const getTodos = () => fetch(URL)
  .then(response => response.json())
  .catch(() => 'Something went wrong');

export default getTodos;
