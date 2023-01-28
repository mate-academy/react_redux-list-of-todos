export const debounce = (func: (query: string) => void, delay: number) => {
  let timerId = 0;

  return (...args: string[]) => {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = setTimeout(func, delay, ...args);
  };
};
