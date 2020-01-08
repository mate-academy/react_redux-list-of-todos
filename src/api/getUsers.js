const URL = 'https://jsonplaceholder.typicode.com/users';
const getUsers = async() => {
  const result = await fetch(URL);

  if (!result.ok) {
    throw new Error(`Could not fetch ${URL}, received ${result.status}`);
  }

  return result.json();
};

export default getUsers;
