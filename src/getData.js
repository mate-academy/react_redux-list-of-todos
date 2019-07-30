const getData = async(type) => {
  const url = `https://jsonplaceholder.typicode.com/`;
  const response = await fetch(url + type);
  return response.json();
};

export default getData;
