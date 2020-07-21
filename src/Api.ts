export const URLTodos = 'https://mate.academy/students-api/todos';
export const URLUsers = 'https://mate.academy/students-api/users';

export const getData = async <T>(url: string): Promise<T[]> => {
  const tempData = await fetch(url)
    .then(response => response.json());

  return tempData.data;
};
