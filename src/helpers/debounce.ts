export const debounce = (
  f: (query: string) => void,
  delay: number,
) => {
  let timeoutId: NodeJS.Timeout;

  return (query: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      f(query);
    }, delay);
  };
};
