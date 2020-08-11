export const getData = async <T>(value: string): Promise<T[]> => {
  const response = await fetch(`https://mate-academy.github.io/react_dynamic-list-of-todos/api/${value}.json`);
  const result = await response.json();

  return result;
};
