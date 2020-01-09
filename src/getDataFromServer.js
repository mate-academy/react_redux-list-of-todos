const getDataFromServer = url => fetch(url).then(responce => responce.json());

export default getDataFromServer;
