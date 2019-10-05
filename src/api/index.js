const URL = 'https://jsonplaceholder.typicode.com/';

function getDataServer(urlParam) {
  return fetch(`${URL}${urlParam}`)
    .then(respons => respons.json());
}

export default getDataServer;
