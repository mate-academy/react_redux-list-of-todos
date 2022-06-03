const mateApi = 'https://mate.academy/students-api/';

export const GetEndpoint = async (name: string, id = '') => {
  const responce = await fetch(`${mateApi}${name}${id}`);

  return responce.json();
};
