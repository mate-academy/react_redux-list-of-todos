const getDataFromServer = async(url) => {
  const data = await fetch(url);
  return data.json();
};

export default getDataFromServer;
