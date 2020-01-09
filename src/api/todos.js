export const todosPromise = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const result = await response.json();

  return result;
};
