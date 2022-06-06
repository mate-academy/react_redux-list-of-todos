type FuncArg = (v: string) => void;

export const debounce = (f: FuncArg, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};
