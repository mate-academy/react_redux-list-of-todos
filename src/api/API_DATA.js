
export const loadPosts = async() => {
  const urlPosts = 'https://jsonplaceholder.typicode.com/posts';
  const responsePosts = await fetch(urlPosts);
  const posts = await responsePosts.json();

  return posts;
};

export const loadUsers = async() => {
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const responseUsers = await fetch(urlUsers);
  const users = await responseUsers.json();

  return users;
};
