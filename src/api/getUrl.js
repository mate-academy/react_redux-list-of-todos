const getUrl = URL => fetch(URL)
  .then(todolist => todolist.json());

export default getUrl;
