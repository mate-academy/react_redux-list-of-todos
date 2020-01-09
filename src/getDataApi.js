const getDataFromServer = URL => (
  fetch(URL).then(response => response.json())
);

export default getDataFromServer;
