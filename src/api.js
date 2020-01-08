export const getDataFromUrl = async(url) => {
  const response = await fetch(url);

  return response.json();
};
